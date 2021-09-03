import org.springframework.web.bind.annotation.RequestMapping;

public class ViewController {
    @RequestMapping({"/", "/workouts", "/posts", "/login", "/home"})
    public String ShowView() {
        return "forward:/index.html";
    }
}
