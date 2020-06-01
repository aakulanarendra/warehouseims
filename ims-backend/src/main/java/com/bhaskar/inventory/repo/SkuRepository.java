package com.bhaskar.inventory.repo;

import com.bhaskar.inventory.collection.Sku;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkuRepository extends MongoRepository<Sku,String> {
}
