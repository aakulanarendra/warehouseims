package com.bhaskar.inventory.repo;

import com.bhaskar.inventory.collection.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin
public interface ProductRepository extends MongoRepository<Product,String> {
    List<Product> findAllByBasicInfoCategory(String categoryId);
}
