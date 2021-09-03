import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class ViewController {
    @RequestMapping({"/", "/workouts", "/posts", "/login", "/home"})
    public String ShowView() {
        return "forward:/index.html";
    }
}
