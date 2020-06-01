package com.bhaskar.inventory.controller;

import com.bhaskar.inventory.collection.Pages;
import com.bhaskar.inventory.collection.Role;
import com.bhaskar.inventory.repo.CustomRepo;
import com.bhaskar.inventory.repo.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class RoleController {

    private final RoleRepository roleRepository;
    private final CustomRepo customRepo;

    @Autowired
    public RoleController(RoleRepository roleRepository, CustomRepo customRepo) {
        this.roleRepository = roleRepository;
        this.customRepo = customRepo;
    }

    @GetMapping("/roles")
    public List<Role> roles() {
        return roleRepository.findAll();
    }

    @GetMapping("/roles/{id}")
    public Role getRole(@PathVariable("id") String roleId) {
        return roleRepository.findById(roleId).orElse(new Role());
    }

    @PostMapping("/roles")
    public Role role(@RequestBody Role role) {
        return roleRepository.save(role);
    }

    @PostMapping("/roles/pages/{id}")
    public List<Pages> role(@RequestBody List<Pages> pages , @PathVariable("id") String id) {
         customRepo.updateRolePages(pages,id);
         return pages;
    }

    @PostMapping("/roles/users/{id}")
    public List<String> user(@RequestBody List<String> users , @PathVariable("id") String id) {
        customRepo.updateUsersRole(users,id);
        return users;
    }
}
