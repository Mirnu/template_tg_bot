import Injectable from "@/core/decorators/Injectable";
import { UtilForUtil } from "./UtilForUtil";

@Injectable()
export default class TestUtil {
    constructor(private UtilForUtil: UtilForUtil ) {}

    public Log() {
        console.log("TEST LOG")
        this.UtilForUtil.Log();
    }
}