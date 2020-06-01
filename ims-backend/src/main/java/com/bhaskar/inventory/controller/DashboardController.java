package com.bhaskar.inventory.controller;

import com.bhaskar.inventory.collection.Pages;
import com.bhaskar.inventory.collection.Role;
import com.bhaskar.inventory.dto.Dashboard;
import com.bhaskar.inventory.repo.CustomRepo;
import com.bhaskar.inventory.repo.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/dashboard")
public class DashboardController {

    private final CustomRepo customRepo;

    @Autowired
    public DashboardController(CustomRepo customRepo) {
        this.customRepo = customRepo;
    }

    @GetMapping
    public Dashboard getDashboard() {
        return customRepo.getDashboardInfo();
    }

}
