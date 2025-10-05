import { ROUTES_KEY } from "../metadata/metadata-keys";

export function Command(command: string) {
  return (target: any, propertyKey: string) => {
    const routes = Reflect.getMetadata(ROUTES_KEY, target) || [];
    routes.push({ command, method: propertyKey });
    Reflect.defineMetadata(ROUTES_KEY, routes, target);
  };
}