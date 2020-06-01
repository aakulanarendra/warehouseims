package com.bhaskar.inventory.repo;

import com.bhaskar.inventory.collection.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin
public interface CustomerRepository extends MongoRepository<Customer,String> {
    @Query(fields = "{ 'customerId': 1, 'firstName':1 ,'lastName':1}")
    List<Customer> getCustomersBy();
}
