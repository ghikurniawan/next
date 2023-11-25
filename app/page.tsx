import JsonEditor from '@/components/JsonEditor';
import { promises as fs } from 'fs';

export default async function Home() {
  const data = await fs.readFile(process.cwd() + '/data/data-1.json', 'utf8') as any;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <JsonEditor data={data} />
    </main>
  )
}