package org.stand.springbootecommerce.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

//import javax.annotation.PostConstruct;

@Configuration
public class StripeConfig {

    @PostConstruct
    public void init() {
        // Replace with your Stripe secret key
        Stripe.apiKey = "sk_test_51NgU8ZKmvY8D2mUAaQBCb9GiKcsJ2V85KjxMOV8lkFhHyG8Z0eUI99OyrAc2v5SPLzrPCUDhvy5N0TEj5MkB0WEK004sZ6f84f";
    }
}