import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (req, res) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });
    try {
      const { title, weekDays } = createHabitBody.parse(req.body);

      const today = dayjs().startOf("day").toDate();

      await prisma.habit.create({
        data: {
          title,
          created_at: today,
          weekDays: {
            create: weekDays.map((day) => {
              return {
                week_day: day,
              };
            }),
          },
        },
      });

      res.send("Habit Created!");
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.send(err.issues);
      }
    }
  });

  app.get("/day", async (req, res) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    try {
      const { date } = getDayParams.parse(req.query);
      const parsedDate = dayjs(date).startOf("day");
      const weekDay = parsedDate.get("day");

      const possibleHabits = await prisma.habit.findMany({
        where: {
          created_at: {
            lte: date,
          },
          weekDays: {
            some: {
              week_day: weekDay,
            },
          },
        },
      });

      const day = await prisma.day.findUnique({
        where: {
          date: parsedDate.toDate(),
        },
        include: {
          dayHabits: true,
        },
      });

      const completedHabits =
        day?.dayHabits.map((dayHabit) => dayHabit.habit_id) ?? [];

      return { possibleHabits, completedHabits };
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.send(err.issues);
      }
    }
  });

  app.patch("/habits/:id/toggle", async (req, res) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    try {
      const { id } = toggleHabitParams.parse(req.params);
      const today = dayjs().startOf("day").toDate();

      // conferir se existe o dia na tabela day
      let day = await prisma.day.findUnique({
        where: {
          date: today,
        },
      });
      // se não existir o dia, cria o dia para poder completar o hábito
      if (!day) {
        day = await prisma.day.create({
          data: {
            date: today,
          },
        });
      }

      const dayHabit = await prisma.dayHabit.findUnique({
        where: {
          day_id_habit_id: {
            day_id: day.id,
            habit_id: id,
          },
        },
      });

      if (dayHabit) {
        // se o hábito já existir, removemos ele da lista de completos
        await prisma.dayHabit.delete({
          where: {
            id: dayHabit.id,
          },
        });
      } else {
        // caso ainda não exista, completamos o hábito
        await prisma.dayHabit.create({
          data: {
            day_id: day.id,
            habit_id: id,
          },
        });
      }

      res.send(`Changes in habit ${id}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.send(err.issues);
      }
    }
  });

  app.get("/summary", async (req, res) => {
    const summary = await prisma.$queryRaw`
    SELECT
      D.id,
      D.date,
      (
        SELECT
          cast(count(*) as float)
        FROM day_habits DH
        WHERE DH.day_id = D.id 
      ) as completed,
      (
        SELECT
          cast(count(*) as float)
        FROM habit_week_days HWD
        JOIN habits H
          on H.id = HWD.habit_id
        WHERE 
          HWD.week_day = cast(strftime('%w', D.date/1000.0, "unixepoch") as int) 
          AND H.created_at <= D.date
      ) as amount
    FROM days D`;

    return summary;
  });
 
}
