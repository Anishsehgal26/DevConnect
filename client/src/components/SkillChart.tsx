import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { skill: "React", level: 90 },
  { skill: "Node", level: 85 },
  { skill: "TypeScript", level: 80 },
  { skill: "Postgres", level: 75 },
  { skill: "Prisma", level: 85 },
  { skill: "Tailwind", level: 92 },
];

export default function SkillChart() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-6 text-2xl font-bold text-white">
        Skills Proficiency
      </h3>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="skill" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip />
            <Bar
              dataKey="level"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}