import fs from 'fs';
import path from 'path';

// Загружает все классы из папки, предполагаем, что каждый файл экспортирует класс по умолчанию
async function loadClasses(dir: string, map = new Map<string, any>()): Promise<Map<string, any>> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await loadClasses(fullPath, map);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
      const module = await import(fullPath);
      // Предполагается default экспорт класса
      if (module.default) {
        map.set(module.default.name, module.default);
      }
    }
  }
  return map;
}

export default loadClasses;