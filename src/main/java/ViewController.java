import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

//    @RequestMapping({"/", "/home", "/login", "/posts", "/workouts"})
@RequestMapping({"/*", })
    public String ShowView() {
        return "forward:/index.html";
    }
}
