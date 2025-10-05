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
    console.log(paramTypes);
    const dependencies = paramTypes.map(paramType => {
      if (!paramType) throw new Error(`No type information for constructor param in ${className}`);

      console.log(paramType.name, this.classesMap);

      const depClass = this.classesMap.get(paramType.name);
      if (!depClass) throw new Error(`Dependency ${paramType.name} for ${className} not found`);

      return this.resolve(depClass);
    });

    console.log(className, dependencies);

    const instance = new klass(...dependencies);
    this.instances.set(className, instance);

    return instance;
  }
}
