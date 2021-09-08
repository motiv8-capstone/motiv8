package com.codeup.capstonestarter.web;

import com.codeup.capstonestarter.data.user.User;
import com.codeup.capstonestarter.data.user.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/users", headers = "Accept=application/json")
public class UsersController {

    private final UserRepository userRepository;


    public UsersController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    private void createUser(@RequestBody User newUser){
        System.out.println(newUser.getUsername());
        System.out.println(newUser.getEmail());

        userRepository.save(newUser);
    }







}
