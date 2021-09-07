package com.codeup.capstonestarter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({"/", "/home", "/login", "/posts", "/workouts"})

    public String ShowView() {
        return "forward:/index.html";
    }
}
