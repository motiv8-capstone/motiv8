package com.codeup.capstonestarter.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping(path = {"/", "/home", "/login", "/posts", "/workouts", "/register","/macros","/profile"}, produces = {"text/html", "text/css", "application/javascript"})

    public String ShowView() {
        return "forward:/index.html";
    }
}