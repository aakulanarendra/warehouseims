package com.bhaskar.inventory.controller;

import com.bhaskar.inventory.collection.Category;
import com.bhaskar.inventory.repo.CategoryRepository;
import com.bhaskar.inventory.response.ProductsRes;
import com.bhaskar.inventory.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/category")
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final ProductService productService;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository, ProductService productService) {
        this.categoryRepository = categoryRepository;
        this.productService = productService;
    }

    @GetMapping
    public List<Category> categories() {
        return categoryRepository.findAll();
    }

    @GetMapping("{id}")
    public Category getCategory(@PathVariable("id") String id) {
        return categoryRepository.findById(id).orElse(new Category());
    }

    @GetMapping("{id}/products")
    public ProductsRes getProducts(@PathVariable("id") String id) {
        return productService.getProductsByCategory(id);
    }

    @PostMapping
    public Category category(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @GetMapping("codes")
    public List<Category> categoryCodes() {
        return categoryRepository.getCategoriesBy();
    }
}
