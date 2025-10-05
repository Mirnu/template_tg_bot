import Injectable from "@/core/decorators/Injectable";

@Injectable()
export default class TestUtil {
    public Log() {
        console.log("TEST LOG")
    }
}