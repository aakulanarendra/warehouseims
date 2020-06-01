package com.bhaskar.inventory.controller;

import com.bhaskar.inventory.collection.Pages;
import com.bhaskar.inventory.repo.PagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/pages")
public class PageController {

    private final PagesRepository pagesRepository;

    @Autowired
    public PageController(PagesRepository pagesRepository) {
        this.pagesRepository = pagesRepository;
    }

    @GetMapping
    public List<Pages> pages() {
        return pagesRepository.findAll();
    }

    @GetMapping("{id}")
    public Pages getPage(@PathVariable("id") String pageId) {
        return pagesRepository.findById(pageId).orElse(new Pages());
    }

    @PostMapping
    public Pages pages(@RequestBody Pages pages) {
        return pagesRepository.save(pages);
    }

    @PostMapping("data")
    public List<Pages> saveAll(@RequestBody List<Pages> pages) {
        return pagesRepository.saveAll(pages);
    }
}
