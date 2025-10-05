import fs from 'fs';
import path from 'path';

export async function loadControllers(dir: string): Promise<any[]> {
  const files = fs.readdirSync(dir);
  const controllers = [];

  for (const file of files) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const modulePath = path.join(dir, file);

      // Динамический импорт модуля
      const module = await import(modulePath);

      if (module.default) {
        controllers.push(module.default);
      } else {
        // Если нет default, взять первый экспорт (по усмотрению)
        const firstExport = Object.values(module)[0];
        controllers.push(firstExport);
      }
    }
  }
  return controllers;
}