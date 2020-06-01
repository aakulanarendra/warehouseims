package com.bhaskar.inventory.controller;

import com.bhaskar.inventory.collection.Attributes;
import com.bhaskar.inventory.dto.AttributeReq;
import com.bhaskar.inventory.dto.Colour;
import com.bhaskar.inventory.dto.Size;
import com.bhaskar.inventory.repo.*;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("api")
public class AttributeController {


    private final CustomRepo customRepo;
    @Autowired
    public AttributesRepository attributeRepository;

    @Autowired
    public AttributeController(CustomRepo customRepo) {
        this.customRepo = customRepo;
    }


    @RequestMapping(method = RequestMethod.GET, value = "/attributes")
    public Attributes skuAttributes() {
        return attributeRepository.findById("1").orElse(new Attributes());
    }

    @RequestMapping(method = RequestMethod.POST, value = "/attributes/colour")
    public Colour skuAttribute(@RequestBody Colour colour) {
        customRepo.addAttribute("colours", colour);
        return colour;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/attributes/size")
    public Size skuAttribute(@RequestBody Size size) {
        customRepo.addAttribute("sizes", size);
        return size;
    }

    @GetMapping("/tax")
    public BigDecimal getTax() {
       return customRepo.getTax();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/tax/update")
    public Attributes updateTax(@RequestBody Attributes attributes) {
        customRepo.updateTax(attributes.getTax());
        return attributes;
    }

}
