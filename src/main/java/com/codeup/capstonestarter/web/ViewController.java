package com.codeup.capstonestarter.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({"/", "/home", "/login", "/posts", "/workouts", "/register"})

    public String ShowView() {
        return "forward:/index.html";
    }
}
