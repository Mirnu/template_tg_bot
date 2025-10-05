import 'reflect-metadata';

export class DIContainer {
  private classesMap: Map<string, any>;
  private instances = new Map<string, any>();

  constructor(classesMap: Map<string, any>) {
    this.classesMap = classesMap;
  }

  resolve<T>(klass: new (...args: any[]) => T): T {
    const className = klass.name;

    if (this.instances.has(className)) {
      return this.instances.get(className);
    }

    const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', klass) || [];
    const dependencies = paramTypes.map(paramType => {
      if (!paramType) throw new Error(`No type information for constructor param in ${className}`);

      const depClass = this.classesMap.get(paramType.name);
      if (!depClass) throw new Error(`Dependency ${paramType.name} for ${className} not found`);

      return this.resolve(depClass);
    });

    const instance = new klass(...dependencies);
    this.instances.set(className, instance);

    return instance;
  }
}
