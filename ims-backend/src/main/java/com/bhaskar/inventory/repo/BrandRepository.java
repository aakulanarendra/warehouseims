package com.bhaskar.inventory.repo;

import com.bhaskar.inventory.collection.Brand;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends MongoRepository<Brand, String> {

}
