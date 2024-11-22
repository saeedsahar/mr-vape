import React from "react";
import { SwiperComponentCustom } from "../../Component/Swiper/Swiper";
import { SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { setBlog } from "./BlogSlice";
import { useNavigate } from "react-router-dom";
import blogImg from "../../assets/images/blog/blogimage.png";
import blogNewInstores2025 from "../../assets/images/blog/whatinstores2025.jpg";
import blogVapingDevicesBudget from "../../assets/images/blog/vapingdevicesbudget.jpg";
import blogImgeliquid from "../../assets/images/blog/best-eliquid2025.jpg";
import blogImgCustomerSwitching from "../../assets/images/blog/customerswitching.jpg";

import blogImgeHistory from "../../assets/images/blog/vapinghistory.jpg";
import blogImgFakeVape from "../../assets/images/blog/fakevape.jpg";
import blogImgVapingMyths from "../../assets/images/blog/vapingmyths.jpg";

import blogImgQuaqeMesh from "../../assets/images/blog/quaqmesh.jpg";

import blogImgFlavourComing2025 from "../../assets/images/blog/flavourscoming2025.jpg";

import blogBanUk from "../../assets/images/blog/banuk.jpg";

import blogImgRetail from "../../assets/images/blog/vaperetailer.jpg";

export const blogArray = [
  {
    title: "Exploring the Top Vape Kit Trends for 2024: What’s New?",
    description: `    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    As we head into 2025, the vaping industry continues to evolve with innovative technologies, more compact designs, and enhanced features that cater to both beginner vapers and seasoned enthusiasts. This year, top brands like <strong>JNR Vapes</strong> are leading the way in creating cutting-edge vape kits that combine performance, portability, and affordability. Here’s a look at the latest trends that are set to dominate the market, from sleek, pocket-sized devices to smarter, longer-lasting options.
  </p>

  <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
    1. Compact and Portable Designs: A Game-Changer for Vapers on the Go
  </h2>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    In 2025, the trend toward smaller, more portable vaping devices continues to gain momentum. Compact designs allow vapers to carry their devices discreetly without sacrificing performance. The <strong>JNR Crystal Pro Max 5000 Puffs</strong>, for example, offers a compact size yet delivers a smooth vaping experience with up to 5000 puffs. This makes it ideal for users who want a device that’s easy to carry in their pocket but doesn’t compromise on flavor or longevity.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>Key Trend:</strong> Ultra-portability without sacrificing performance.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>JNR Insight:</strong> The <strong>JNR Crystal Pro Max</strong> proves that size isn’t everything; its portability and long-lasting puffs make it an excellent choice for frequent travelers or on-the-go vapers.
  </p>

  <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
    2. New Tech Features: Smarter Vaping for the Modern User
  </h2>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    2025 sees an influx of new tech in vape kits, including advanced airflow systems, better battery management, and even app connectivity. The <strong>JNR Alien 10000 Puffs</strong> is a great example, offering improved battery life, smarter draw sensors, and enhanced flavor delivery systems. These features make for an even smoother and more consistent vaping experience.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>Key Trend:</strong> Integration of smarter technology for precision and efficiency.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>JNR Insight:</strong> With the <strong>JNR Alien</strong>, users can enjoy cutting-edge tech that optimizes every puff, making each vape session seamless and satisfying.
  </p>

  <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
    3. Enhanced Durability and Longer Life: A Focus on Longevity
  </h2>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    As vapers demand products that offer better value and longer-lasting performance, brands like JNR are stepping up with devices that are built to last. The <strong>JNR Falcon-X 18000 Puffs</strong> takes durability to a new level with its extended lifespan and robust design. With 18,000 puffs, it’s perfect for those who don’t want to constantly replace their device.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>Key Trend:</strong> Devices that last longer, offering more puffs and reducing the frequency of replacements.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>JNR Insight:</strong> The <strong>JNR Falcon-X</strong> provides impressive longevity while maintaining a sleek and modern design—ideal for vapers who want to get the most out of their investment.
  </p>

  <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
    4. Shisha-Inspired Flavors and Styles: A Traditional Twist with a Modern Edge
  </h2>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    For 2025, there’s a notable trend toward blending traditional experiences with modern tech. Shisha-inspired vape kits are gaining popularity, offering classic flavors with the convenience of modern, disposable devices. The <strong>JNR Shisha 12000 Puffs</strong> offers a refreshing take on traditional shisha, bringing those rich, aromatic flavors into a sleek, easy-to-use vape kit.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>Key Trend:</strong> Shisha-inspired vaping, combining tradition with technology.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>JNR Insight:</strong> The <strong>JNR Shisha</strong> series is perfect for those who enjoy the cultural experience of shisha but want a more modern, portable solution.
  </p>

  <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
    5. Sustainability in Vape Kits: Eco-Friendly Designs
  </h2>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    As sustainability becomes more important in the consumer product market, the vaping industry is following suit with eco-friendly innovations. Brands like JNR are focusing on recyclable materials and reducing waste. Look for vape kits that not only offer great performance but also help minimize environmental impact.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>Key Trend:</strong> A move toward sustainability in vaping products, including recyclable components.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    <strong>JNR Insight:</strong> JNR’s commitment to eco-friendly materials ensures that you can enjoy your vape sessions while being mindful of your environmental footprint.
  </p>

  <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
    Conclusion: The Future of Vaping in 2025
  </h2>
  <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
    2025 is shaping up to be an exciting year for the vaping industry, with innovations in design, technology, and sustainability. JNR Vapes is at the forefront of these trends, offering a diverse range of products that cater to every type of vaper. Whether you’re looking for compact portability, enhanced tech, or a more eco-friendly vape experience, JNR’s 2025 lineup has something for you.
  </p>`,
    image: blogNewInstores2025,
    shortDescription:
      "Discover 2025’s vape kit trends, including compact designs, new tech, and improved features, plus insights from top brands.",
  },
  {
    title: "The Best E-Liquid Brands of 2025",
    description: `
    <p style="font-size: 16px; margin-bottom: 15px;">
      The vaping world is buzzing with excitement in 2025 as e-liquid brands continue to push the boundaries of flavor, quality, and innovation. Among these, 
      <strong style="color: #e74c3c;">Niplo</strong> stands out as a leader, setting a new benchmark for excellence in the industry. Let’s explore the top brands that are shaping the e-liquid market this year.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">1. Niplo: Leading the Way in Innovation</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      Niplo continues to dominate the e-liquid market with its groundbreaking flavors and exceptional quality. Known for its bold, innovative approach, Niplo 
      combines premium ingredients with cutting-edge technology to deliver a vaping experience like no other.
  </p>
  <p style="font-size: 16px; margin-bottom: 15px;">
      <strong>Top Picks:</strong> Niplo’s tropical blends and dessert-inspired flavors are a hit among vapers, offering a perfect balance of sweetness and smoothness.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">2. Vaporia: A Flavorful Journey</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      Vaporia has carved out a niche for itself with its diverse range of flavors and dedication to quality. From fruity explosions to refreshing menthols, this brand ensures that there’s something for every palate.
  </p>
  <p style="font-size: 16px; margin-bottom: 15px;">
      <strong>Top Picks:</strong> Their berry-inspired e-liquids and iced flavors are particularly popular in 2025.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">3. CloudFusion: Perfect for Cloud Chasers</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      For those who love thick clouds and rich flavor profiles, CloudFusion is the brand to beat. Its high VG (vegetable glycerin) blends are designed to maximize vapor production without compromising on taste.
  </p>
  <p style="font-size: 16px; margin-bottom: 15px;">
      <strong>Top Picks:</strong> Creamy custards and classic tobacco blends are standout options from CloudFusion.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">4. FlavorArt: Authentic and Pure</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      FlavorArt prides itself on using natural ingredients to create authentic, pure flavors. Their attention to detail ensures that each bottle is crafted to perfection, making them a favorite among flavor purists.
  </p>
  <p style="font-size: 16px; margin-bottom: 15px;">
      <strong>Top Picks:</strong> Citrus blends and vanilla-infused flavors are highly recommended.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">5. EcoJuice: Sustainability Meets Flavor</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      As sustainability becomes a top priority, EcoJuice leads the way with eco-friendly packaging and responsibly sourced ingredients. Their commitment to the environment doesn’t come at the cost of flavor, as they offer a range of delicious, guilt-free options.
  </p>
  <p style="font-size: 16px; margin-bottom: 15px;">
      <strong>Top Picks:</strong> EcoJuice’s organic fruit flavors are both refreshing and environmentally friendly.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">Conclusion</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      2025 is shaping up to be an incredible year for e-liquid enthusiasts. With brands like <strong style="color: #e74c3c;">Niplo</strong> leading the charge in innovation and quality, there’s never been a better time to explore new flavors and elevate your vaping experience. Whether you’re seeking bold, exotic blends or eco-conscious choices, the top brands of 2025 have something for everyone.
  </p>
    `,
    image: blogImgeliquid,
    shortDescription:
      "Discover the top e-liquid brands of 2025, with Niplo leading the way in flavor, quality, and innovation.",
  },
  {
    title: "Top Budget-Friendly Vaping Devices at VapePlanet.co.uk",
    description: `
    <div style="padding: 20px;">
      <p style="font-size: 16px; line-height: 1.6; color: #34495e;">Experience exceptional quality without breaking the bank. VapePlanet.co.uk offers a variety of budget-friendly vape devices that provide great performance, longevity, and flavor.</p>

      <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 20px; color: #2c3e50;">1. JNR Crystal Pro Max 5000 Puffs: Compact Yet Powerful</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #34495e;">For vapers on the go, the JNR Crystal Pro Max 5000 Puffs offers portability, affordability, and performance. This device delivers a smooth vaping experience with consistent flavors lasting up to 5,000 puffs. Its compact size makes it easy to carry while offering exceptional value.</p>
      </div>

      <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 20px; color: #2c3e50;">2. JNR Black and Gold 600 Puffs: Small But Mighty</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #34495e;">If you're just starting out or need something discreet, the JNR Black and Gold 600 Puffs delivers a rich, satisfying flavor in a sleek, portable design. This device offers a premium feel at a fraction of the cost.</p>
      </div>

      <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 20px; color: #2c3e50;">3. JNR Alien 10000 Puffs: Long-Lasting Value</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #34495e;">The JNR Alien 10000 Puffs provides up to 10,000 puffs, offering a smooth vaping experience for an extended period. Its ergonomic design makes it easy to carry, making it a great investment for vapers who want a long-lasting device at a reasonable price.</p>
      </div>

      <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 20px; color: #2c3e50;">4. JNR Falcon-X 18000 Puffs: High-Performance on a Budget</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #34495e;">The JNR Falcon-X 18000 Puffs offers incredible value for those seeking durability and longevity. With 18,000 puffs, this device delivers excellent performance without the premium price tag. Its sleek, modern design ensures you get top-tier quality without breaking the bank.</p>
      </div>

      <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 20px; color: #2c3e50;">5. JNR Shisha 12000 Puffs: A Taste of Tradition at an Affordable Price</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #34495e;">For shisha enthusiasts, the JNR Shisha 12000 Puffs offers traditional flavors in a convenient, disposable vape. With 12,000 puffs, it’s a great way to enjoy rich flavors without compromising on affordability or quality.</p>
      </div>

      <p style="font-size: 16px; line-height: 1.6; color: #34495e;"><strong>Why Choose Budget-Friendly Devices at VapePlanet.co.uk?</strong></p>
      <p style="font-size: 16px; line-height: 1.6; color: #34495e;">VapePlanet.co.uk is dedicated to bringing you top-notch vaping experiences at prices you can afford. Our carefully selected range of devices from JNR Vapes ensures you get exceptional value without compromising quality. All of our devices are designed to deliver consistent flavor, longevity, and satisfaction—proving you don’t have to spend a lot to enjoy a great vaping experience.</p>

      <p style="font-size: 16px; line-height: 1.6; color: #34495e;"><strong>Conclusion:</strong> You don’t have to break the bank for a great vaping experience. At VapePlanet.co.uk, we offer affordable devices like the JNR Crystal Pro Max and JNR Alien, each crafted to deliver quality performance. Visit us today and find the perfect vape that suits your needs and your wallet!</p>

      <a href="https://vapeplanet.co.uk" style="background-color: #e74c3c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; margin-top: 20px;">Shop Now</a>
  </div>`,
    image: blogVapingDevicesBudget,
    shortDescription:
      "Unlock unbeatable vaping experiences without the hefty price tag—explore the top budget-friendly devices at VapePlanet.co.uk today!",
  },
  {
    title:
      "What Customers Are Saying About Switching from Disposable Vapes to Bundle Kits",
    description: `
  <p style="font-size: 16px; margin-bottom: 15px;">
      In the ever-evolving world of vaping, more customers are making the switch from disposable vapes to bundle kits. Why? The benefits of cost savings, sustainability, and enhanced customization have made bundle kits a game-changer. Let’s dive into what customers have to say about their experiences with this transition.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">1. Cost Savings: A Worthwhile Investment</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      One of the most common reasons customers switch to bundle kits is the significant cost savings. Disposable vapes may seem affordable at first, but their frequent replacements add up over time. Customers like Sarah M. from London praise bundle kits for their value:
  </p>
  <blockquote style="font-style: italic; margin-left: 20px; font-size: 16px; color: #7f8c8d;">
      "I used to spend so much on disposables every week. Switching to a bundle kit has saved me money, and I love having the flexibility to refill my device."
  </blockquote>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">2. Sustainability: A Greener Choice</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      Environmental concerns are driving many vapers toward more sustainable options. Bundle kits allow for reusable components, reducing waste compared to single-use disposables. James K., a long-time vaper, shares his thoughts:
  </p>
  <blockquote style="font-style: italic; margin-left: 20px; font-size: 16px; color: #7f8c8d;">
      "I feel better knowing I’m contributing less to landfill. My bundle kit is durable and easy to maintain, which makes it an eco-friendly alternative."
  </blockquote>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">3. Enhanced Customization and Flavor Choices</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      Bundle kits offer vapers more control over their experience. From adjustable wattage to a wider variety of e-liquid flavors, the options are endless. Emily R., a fan of fruity flavors, shares her excitement:
  </p>
  <blockquote style="font-style: italic; margin-left: 20px; font-size: 16px; color: #7f8c8d;">
      "With disposables, I was stuck with limited flavors. Now, I can mix and match e-liquids to create my own unique blends—it’s a whole new level of vaping!"
  </blockquote>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">4. Durability and Long-Term Use</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      Disposable vapes are designed for short-term use, but bundle kits are built to last. This durability appeals to customers who value reliability. Michael P. notes:
  </p>
  <blockquote style="font-style: italic; margin-left: 20px; font-size: 16px; color: #7f8c8d;">
      "My bundle kit has been a solid investment. It’s durable, easy to refill, and I don’t have to worry about running out of charge as often."
  </blockquote>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">5. Initial Learning Curve: Worth the Effort</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      While some customers mention an initial learning curve when transitioning to bundle kits, most agree that the benefits outweigh the challenges. Lisa T. shares her perspective:
  </p>
  <blockquote style="font-style: italic; margin-left: 20px; font-size: 16px; color: #7f8c8d;">
      "At first, I wasn’t sure how to use the kit properly, but after a few days, it became second nature. Now, I can’t imagine going back to disposables."
  </blockquote>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">Conclusion: A Smart Choice for Vapers</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      Switching from disposable vapes to bundle kits is more than a trend—it’s a smart decision for vapers looking for cost efficiency, sustainability, and a better overall experience. While it may take some time to adjust, customers overwhelmingly report that the benefits are well worth it. If you’re ready to make the switch, explore our range of bundle kits and take your vaping experience to the next level!
  </p>
    `,
    image: blogImgCustomerSwitching,
    shortDescription:
      "Customers are making the switch to bundle kits for a cost-effective, customizable, and eco-friendly vaping experience!",
  },
  {
    title: "A Brief History of the Vaping Industry",
    description: `
    <p style="font-size: 16px; margin-bottom: 15px;">
      The vaping industry has grown tremendously over the past two decades, evolving from a niche concept to a global phenomenon. This transformation has been driven by innovation, changing consumer preferences, and a growing focus on alternatives to traditional smoking. Let’s take a journey through the key milestones that have shaped vaping into the thriving industry it is today.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">1. The Early Beginnings: The Birth of Vaping</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      The concept of vaping dates back to the early 20th century, with the first patents for smokeless, non-tobacco cigarettes appearing as early as 1927. However, it wasn’t until 2003 that the modern e-cigarette, as we know it, was invented by Chinese pharmacist Hon Lik. His creation, inspired by a desire to quit smoking, laid the foundation for the vaping industry.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">2. The Rise of E-Cigarettes: Early Commercial Success</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      In the mid-2000s, e-cigarettes began gaining traction in global markets. Early devices mimicked the appearance of traditional cigarettes and were marketed as a healthier alternative. These products quickly gained popularity among smokers seeking a way to reduce or quit smoking, setting the stage for the industry's expansion.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">3. Innovation and Diversification: The Birth of Mods and Vape Kits</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      By the 2010s, vaping technology had advanced significantly. The introduction of customizable vape mods allowed users to adjust wattage, airflow, and other settings, creating a more personalized experience. This period also saw the rise of pod systems and bundle kits, catering to both beginners and experienced vapers.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">4. Flavors and E-Liquids: Expanding Consumer Choice</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      A major factor in vaping’s popularity has been the variety of e-liquid flavors available. From classic tobacco to exotic fruit blends, the diverse options appeal to a wide range of preferences. This innovation has helped attract a broader audience, making vaping a mainstream lifestyle choice for many.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">5. Regulation and Industry Challenges</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      As vaping grew, so did regulatory scrutiny. Governments around the world introduced measures to address safety concerns, underage use, and product standards. Despite these challenges, the industry has adapted, with manufacturers prioritizing compliance and quality.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">6. The Modern Vaping Landscape: A Thriving Industry</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      Today, vaping is a multi-billion-dollar industry with millions of users worldwide. From compact disposable devices to high-tech bundle kits, the options available reflect the diverse needs of consumers. The industry continues to innovate, with a focus on sustainability, enhanced technology, and improved user experiences.
  </p>

  <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">Conclusion: A Bright Future Ahead</h2>
  <p style="font-size: 16px; margin-bottom: 15px;">
      The evolution of vaping is a testament to the power of innovation and adaptability. What began as a niche alternative to smoking has grown into a thriving industry that caters to a wide range of preferences and lifestyles. As the industry continues to evolve, the future of vaping looks brighter than ever.
  </p>
    `,
    image: blogImgeHistory,
    shortDescription:
      "Explore the evolution of vaping from its early beginnings to the thriving industry it is today.",
  },
  {
    title: "What’s in the Box: A Guide to Spotting Fake Vapes",
    description: `
    <header style="text-align: center; padding: 20px; background-color: #2c3e50; color: #ecf0f1; border-radius: 8px;">
    <h1 style="font-size: 32px; margin: 0;">How to Identify Fake Vapes</h1>
    <p style="font-size: 18px; margin: 10px 0 0;">Avoid Counterfeit Products with Our Essential Guide</p>
</header>

<section style="margin-top: 30px; padding: 15px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="font-size: 26px; color: #34495e; margin-bottom: 10px;">1. Check the Packaging</h2>
    <p style="font-size: 16px; margin-bottom: 10px;">
        Authentic vaping devices often come with high-quality packaging that includes proper branding, logos, and seals. Counterfeit products may have spelling errors, faded colors, or inconsistent fonts. Always inspect the packaging carefully before purchasing.
    </p>
    <div style="background-color: #f9fafb; padding: 10px; border-left: 5px solid #3498db;">
        <strong style="font-size: 16px;">Quick Tip:</strong> Look for a holographic seal or QR code to verify authenticity.
    </div>
</section>

<section style="margin-top: 20px; padding: 15px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="font-size: 26px; color: #34495e; margin-bottom: 10px;">2. Verify the Serial Number</h2>
    <p style="font-size: 16px; margin-bottom: 10px;">
        Most reputable brands include a unique serial number on their products. Visit the manufacturer's website to confirm the authenticity of the serial number. If the product lacks this feature, it’s a red flag.
    </p>
    <div style="background-color: #f9fafb; padding: 10px; border-left: 5px solid #e67e22;">
        <strong style="font-size: 16px;">Warning:</strong> Never trust a device without a serial number or verification method.
    </div>
</section>

<section style="margin-top: 20px; padding: 15px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="font-size: 26px; color: #34495e; margin-bottom: 10px;">3. Examine the Build Quality</h2>
    <p style="font-size: 16px; margin-bottom: 10px;">
        Counterfeit vapes often have inferior build quality with loose parts, uneven finishes, or poorly functioning buttons. Authentic devices, on the other hand, feel sturdy and well-constructed. Don’t settle for a device that looks or feels cheaply made.
    </p>
    <div style="background-color: #f9fafb; padding: 10px; border-left: 5px solid #2ecc71;">
        <strong style="font-size: 16px;">Pro Tip:</strong> Compare the device to official product photos on the manufacturer’s website.
    </div>
</section>

<section style="margin-top: 20px; padding: 15px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="font-size: 26px; color: #34495e; margin-bottom: 10px;">4. Buy from Trusted Retailers</h2>
    <p style="font-size: 16px; margin-bottom: 10px;">
        To avoid fake products, always purchase from authorized retailers or the manufacturer’s official website. Avoid purchasing from unknown online marketplaces or unverified sellers who may offer unrealistically low prices.
    </p>
    <div style="background-color: #f9fafb; padding: 10px; border-left: 5px solid #e74c3c;">
        <strong style="font-size: 16px;">Important:</strong> If the deal seems too good to be true, it probably is.
    </div>
</section>

<footer style="margin-top: 30px; padding: 20px; background-color: #2c3e50; color: #ecf0f1; border-radius: 8px; text-align: center;">
    <p style="font-size: 16px; margin: 0;">
        Protect yourself from counterfeits by staying informed and buying smart. For more tips, visit our blog or contact us for guidance.
    </p>
</footer>
    `,
    image: blogImgFakeVape,
    shortDescription:
      "Learn how to identify fake vapes and avoid counterfeit products with our essential guide to recognizing authentic vaping devices.",
  },
  {
    title:
      "Top Vaping Myths Unraveled: Vaping Misconceptions That Are Pure Fiction",
    description: `
    <header style="text-align: center; background-color: #283593; color: white; padding: 20px; border-radius: 8px;">
      <h1 style="font-size: 30px; margin: 0;">Debunking Common Vaping Myths</h1>
      <p style="font-size: 18px; margin-top: 10px;">Uncover the truth about vaping safety and effectiveness.</p>
  </header>

  <section style="margin-top: 30px; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="font-size: 24px; color: #1a237e;">Myth 1: Vaping is Just as Harmful as Smoking</h2>
      <p style="font-size: 16px; margin-bottom: 10px;">
          While no form of smoking or vaping is completely risk-free, research shows that vaping is significantly less harmful than smoking traditional cigarettes. According to Public Health England, e-cigarettes are estimated to be 95% less harmful than combustible tobacco products.
      </p>
      <div style="background-color: #e3f2fd; padding: 10px; border-left: 4px solid #2196f3;">
          <strong style="font-size: 16px;">Fact:</strong> Vaping eliminates the tar and many harmful chemicals found in cigarette smoke.
      </div>
  </section>

  <section style="margin-top: 20px; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="font-size: 24px; color: #1a237e;">Myth 2: Vaping is Addictive Even Without Nicotine</h2>
      <p style="font-size: 16px; margin-bottom: 10px;">
          Nicotine is the substance responsible for addiction in both smoking and vaping. However, many e-liquids are available in nicotine-free options, making them non-addictive. Vapers can gradually reduce their nicotine intake over time, making it easier to quit entirely.
      </p>
      <div style="background-color: #ede7f6; padding: 10px; border-left: 4px solid #673ab7;">
          <strong style="font-size: 16px;">Fact:</strong> Nicotine-free vaping eliminates the risk of addiction, offering more control to users.
      </div>
  </section>

  <section style="margin-top: 20px; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="font-size: 24px; color: #1a237e;">Myth 3: Vaping Causes Popcorn Lung</h2>
      <p style="font-size: 16px; margin-bottom: 10px;">
          The concern about "popcorn lung" stems from an ingredient called diacetyl, once used in some e-liquids for flavoring. However, diacetyl has been banned in e-liquids in many regions, including the UK and EU. Modern vaping products are diacetyl-free and safe when used as intended.
      </p>
      <div style="background-color: #ffebee; padding: 10px; border-left: 4px solid #f44336;">
          <strong style="font-size: 16px;">Fact:</strong> Popcorn lung is not a risk with reputable, regulated vaping products.
      </div>
  </section>

  <section style="margin-top: 20px; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="font-size: 24px; color: #1a237e;">Myth 4: Vaping Leads to Smoking</h2>
      <p style="font-size: 16px; margin-bottom: 10px;">
          Evidence suggests that vaping is primarily used as a tool for smoking cessation rather than a gateway to smoking. In fact, many adult smokers successfully transition to vaping and eventually quit nicotine altogether.
      </p>
      <div style="background-color: #e8f5e9; padding: 10px; border-left: 4px solid #4caf50;">
          <strong style="font-size: 16px;">Fact:</strong> Vaping is a harm-reduction tool, helping smokers quit rather than encouraging non-smokers to start.
      </div>
  </section>

  <section style="margin-top: 20px; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="font-size: 24px; color: #1a237e;">Myth 5: Vaping Produces Dangerous Secondhand Smoke</h2>
      <p style="font-size: 16px; margin-bottom: 10px;">
          Unlike traditional smoking, vaping produces aerosol rather than smoke. Studies have shown that the exhaled vapor contains significantly fewer harmful substances than cigarette smoke, making it less of a health risk to bystanders.
      </p>
      <div style="background-color: #fff3e0; padding: 10px; border-left: 4px solid #ff9800;">
          <strong style="font-size: 16px;">Fact:</strong> Vaping aerosol dissipates quickly and poses minimal risks compared to secondhand smoke.
      </div>
  </section>

  <footer style="margin-top: 30px; padding: 20px; background-color: #283593; color: white; text-align: center; border-radius: 8px;">
      <p style="font-size: 16px; margin: 0;">
          Stay informed about vaping and make decisions based on facts, not myths. For more expert insights, explore our blog or contact us directly.
      </p>
  </footer>
    `,
    image: blogImgVapingMyths,
    shortDescription:
      "Debunk the most common vaping myths and learn the truth behind misconceptions that have misled many about vaping safety and effectiveness.",
  },
  {
    title: "QUAQ Mesh Coil Technology: What is It and Why is It Awesome?",
    description: `
    <header style="background: linear-gradient(90deg, #4caf50, #388e3c); color: white; text-align: center; padding: 30px;">
      <h1 style="margin: 0; font-size: 32px;">The Power of QUAQ Mesh Coil Technology</h1>
      <p style="margin: 10px 0 0; font-size: 18px;">Elevate your vaping experience with better flavor, consistent vapor, and extended coil life.</p>
  </header>

  <!-- Content Section -->
  <section style="display: flex; flex-wrap: wrap; margin: 20px; gap: 20px;">
      
      <!-- Image Section -->
      <div style="flex: 1 1 40%; min-width: 300px; text-align: center;">
          <img src="https://via.placeholder.com/400" alt="QUAQ Mesh Coil" style="width: 100%; max-width: 400px; border-radius: 10px;">
      </div>

      <!-- Text Section -->
      <div style="flex: 1 1 50%; min-width: 300px; padding: 10px; background: white; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="font-size: 28px; color: #4caf50;">Why Choose QUAQ Mesh Coil?</h2>
          <p style="font-size: 16px; margin-top: 10px;">
              QUAQ Mesh Coil technology is revolutionizing the vaping industry by enhancing every aspect of the vaping experience. From delivering rich, vibrant flavors to creating smooth and consistent vapor clouds, this innovation redefines quality.
          </p>
          <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; font-size: 16px;">
              <li><strong>Better Flavor:</strong> Enjoy intense, pure flavors from your e-liquids.</li>
              <li><strong>Consistent Vapor:</strong> Get smooth, uniform vapor production every time.</li>
              <li><strong>Extended Coil Life:</strong> Durable design ensures your coils last longer, saving you money.</li>
          </ul>
      </div>
  </section>

  <!-- Highlight Section -->
  <section style="background: #e8f5e9; padding: 20px; margin: 20px; border-radius: 10px; border: 1px solid #c8e6c9;">
      <h2 style="color: #388e3c; font-size: 26px; text-align: center;">What Sets QUAQ Mesh Coil Apart?</h2>
      <p style="font-size: 16px; text-align: center; max-width: 800px; margin: 0 auto;">
          The QUAQ Mesh Coil’s innovative design ensures faster heating and more efficient wicking. This means fewer dry hits and a more enjoyable vape with every puff. The mesh structure provides an even heat distribution, enhancing the overall flavor profile of your favorite e-liquids.
      </p>
  </section>

  <!-- Features Section -->
  <section style="display: flex; flex-wrap: wrap; margin: 20px; gap: 20px;">
      
      <!-- Feature 1 -->
      <div style="flex: 1 1 30%; min-width: 200px; text-align: center; background: white; border: 1px solid #ddd; border-radius: 10px; padding: 15px;">
          <h3 style="color: #388e3c; font-size: 20px;">Faster Heating</h3>
          <p style="font-size: 14px; margin-top: 10px;">Experience instant vapor production for a more responsive vape.</p>
      </div>

      <!-- Feature 2 -->
      <div style="flex: 1 1 30%; min-width: 200px; text-align: center; background: white; border: 1px solid #ddd; border-radius: 10px; padding: 15px;">
          <h3 style="color: #388e3c; font-size: 20px;">Enhanced Flavor</h3>
          <p style="font-size: 14px; margin-top: 10px;">Unlock the full potential of your e-liquids with vibrant, rich taste.</p>
      </div>

      <!-- Feature 3 -->
      <div style="flex: 1 1 30%; min-width: 200px; text-align: center; background: white; border: 1px solid #ddd; border-radius: 10px; padding: 15px;">
          <h3 style="color: #388e3c; font-size: 20px;">Cost-Effective</h3>
          <p style="font-size: 14px; margin-top: 10px;">Extended coil lifespan means fewer replacements and more savings.</p>
      </div>
  </section>

  <!-- Call to Action -->
  <footer style="background: #4caf50; color: white; text-align: center; padding: 20px; border-radius: 10px; margin: 20px;">
      <h2 style="font-size: 24px;">Ready to Elevate Your Vape?</h2>
      <p style="font-size: 16px; margin: 10px 0;">Experience the QUAQ Mesh Coil difference today. Discover better flavor, smoother vapor, and longer-lasting coils.</p>
      <a href="#" style="display: inline-block; background: #fff; color: #4caf50; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; margin-top: 10px;">Explore Now</a>
  </footer>
    `,
    image: blogImgQuaqeMesh,
    shortDescription:
      "Discover how QUAQ Mesh Coil technology elevates your vape with better flavor, consistent vapor, and extended coil life for a superior vaping experience.",
  },
  {
    title: "The Best E-Liquid Flavours Coming into 2025",
    description: `
    <!-- Header Section -->
  <header style="background: linear-gradient(135deg, #ff5722, #ff9800); color: white; text-align: center; padding: 40px 20px;">
      <h1 style="margin: 0; font-size: 36px;">Top E-Liquid Flavours of 2025</h1>
      <p style="font-size: 18px; margin-top: 10px;">Bold tastes and innovative blends that are redefining vaping for every enthusiast.</p>
  </header>

  <!-- Content Section -->
  <section style="margin: 20px auto; max-width: 1200px; padding: 20px; background: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px;">
      <h2 style="text-align: center; font-size: 28px; color: #ff5722;">The Must-Try Flavours</h2>
      <p style="text-align: center; font-size: 16px; max-width: 800px; margin: 0 auto;">
          2025 is shaping up to be a year of innovation in e-liquid flavors. From exotic fruit blends to indulgent dessert-inspired creations, these exciting new tastes promise to elevate your vaping experience. Explore our top picks below.
      </p>

      <!-- Flavours Section -->
      <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
          <div style="flex: 1 1 30%; background: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 15px; text-align: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.3s;">
              <img src="https://via.placeholder.com/300" alt="Tropical Escape" style="max-width: 100%; border-radius: 10px;">
              <h3 style="color: #ff5722; font-size: 20px; margin: 15px 0;">Tropical Escape</h3>
              <p style="font-size: 14px; color: #555;">A vibrant mix of mango, pineapple, and passionfruit that transports your taste buds to a sunny paradise.</p>
          </div>

          <div style="flex: 1 1 30%; background: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 15px; text-align: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.3s;">
              <img src="https://via.placeholder.com/300" alt="Caramel Delight" style="max-width: 100%; border-radius: 10px;">
              <h3 style="color: #ff5722; font-size: 20px; margin: 15px 0;">Caramel Delight</h3>
              <p style="font-size: 14px; color: #555;">Indulge in the rich, creamy notes of caramel with a hint of vanilla for a dessert-like experience.</p>
          </div>

          <div style="flex: 1 1 30%; background: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 15px; text-align: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.3s;">
              <img src="https://via.placeholder.com/300" alt="Berry Fusion" style="max-width: 100%; border-radius: 10px;">
              <h3 style="color: #ff5722; font-size: 20px; margin: 15px 0;">Berry Fusion</h3>
              <p style="font-size: 14px; color: #555;">A luscious combination of strawberries, blueberries, and raspberries for a fruity explosion of flavor.</p>
          </div>
      </div>

      <!-- Call to Action -->
      <div style="text-align: center; margin-top: 30px;">
          <a href="#" style="display: inline-block; background: #ff5722; color: white; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; transition: background 0.3s;">Explore More Flavours</a>
      </div>
  </section>
    `,
    image: blogImgFlavourComing2025,
    shortDescription:
      "Discover the exciting new e-liquid flavours that are set to dominate the vaping scene in 2025, offering bold tastes and innovative blends for every vaper.",
  },
  {
    title: "Vape Planet UK Backs the Call for a Vape Retailer Licensing Scheme",
    description: `
    <!-- Header Section -->
  <header style="background-color: #1e88e5; color: white; text-align: center; padding: 40px 20px;">
      <h1 style="margin: 0; font-size: 36px;">Vape Planet UK: Supporting Vape Retailer Licensing</h1>
      <p style="font-size: 18px; margin-top: 10px;">Ensuring Quality, Safety, and Regulation for a Better Vaping Industry</p>
  </header>

  <!-- Content Section -->
  <section style="max-width: 1200px; margin: 30px auto; padding: 20px; background: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px;">
      <h2 style="font-size: 28px; color: #1e88e5; text-align: center;">The Importance of Vape Retailer Licensing</h2>
      <p style="font-size: 16px; color: #555; max-width: 800px; margin: 0 auto; text-align: center;">
          Vape Planet UK strongly supports the implementation of a vape retailer licensing scheme to help maintain a high standard of quality, safety, and regulation within the vaping industry. This initiative aims to protect consumers and create a more trustworthy marketplace.
      </p>

      <div style="margin-top: 40px;">
          <h3 style="font-size: 24px; color: #1e88e5;">Quality Assurance</h3>
          <p style="font-size: 16px; color: #555;">
              With the increase in the number of vape retailers, it’s essential to ensure that all products sold in the market meet safety standards. A retailer licensing scheme would guarantee that only high-quality, compliant products are sold, providing vapers with peace of mind that they are using trusted and safe products.
          </p>
      </div>

      <div style="margin-top: 30px;">
          <h3 style="font-size: 24px; color: #1e88e5;">Safety First</h3>
          <p style="font-size: 16px; color: #555;">
              A licensing scheme would help weed out counterfeit, substandard, or unsafe vaping products that pose potential health risks. By regulating the industry, consumers can be assured that all products sold are thoroughly vetted for safety and compliance with legal standards.
          </p>
      </div>

      <div style="margin-top: 30px;">
          <h3 style="font-size: 24px; color: #1e88e5;">Regulation and Accountability</h3>
          <p style="font-size: 16px; color: #555;">
              Retailer licensing would introduce accountability within the vaping industry. Licensed retailers would be required to comply with specific rules and regulations, ensuring ethical practices, accurate product labeling, and transparent business operations. This would help build a more reputable industry and trust with consumers.
          </p>
      </div>

      <div style="margin-top: 40px; text-align: center;">
          <h2 style="font-size: 26px; color: #1e88e5;">Vape Planet UK's Commitment</h2>
          <p style="font-size: 16px; color: #555; max-width: 800px; margin: 0 auto;">
              At Vape Planet UK, we believe in the power of responsible vaping. We are committed to supporting the implementation of a vape retailer licensing scheme, ensuring that consumers receive the best products and experience safe, enjoyable vaping sessions. Join us in advocating for a regulated and trustworthy vaping industry.
          </p>
      </div>

      <!-- Call to Action Section -->
      <div style="text-align: center; margin-top: 40px;">
          <a href="#" style="background-color: #1e88e5; color: white; text-decoration: none; padding: 12px 25px; font-size: 16px; border-radius: 5px; transition: background 0.3s;">
              Learn More About Vape Retailer Licensing
          </a>
      </div>
  </section>
    `,
    image: blogImgRetail,
    shortDescription:
      "Vape Planet UK supports the implementation of a vape retailer licensing scheme to ensure quality, safety, and regulation within the industry.",
  },
  {
    title: "Could the UK Really Ban Disposables?",
    description: `
    <header style="background-color: #1e88e5; color: white; text-align: center; padding: 40px;">
      <h1 style="font-size: 36px; margin: 0;">The Future of Disposable Vapes in the UK</h1>
      <p style="font-size: 18px; margin-top: 10px;">Is the Potential Ban the End of an Era or Just Another Regulatory Shift?</p>
  </header>

  <!-- Content Section -->
  <section style="max-width: 1200px; margin: 30px auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
      <h2 style="font-size: 28px; color: #1e88e5; text-align: center;">What's Happening in the UK Vaping Community?</h2>
      <p style="font-size: 16px; color: #555; text-align: center; max-width: 800px; margin: 0 auto;">
          The UK vaping community has been buzzing with concern over the potential ban on disposable vapes. With regulations tightening and health concerns on the rise, disposable vapes have become the target of increasing scrutiny. Could this mark the end of an era for this popular product, or is it simply another step toward more responsible regulation in the industry?
      </p>

      <div style="margin-top: 30px;">
          <h3 style="font-size: 24px; color: #1e88e5;">Why the Ban is Being Considered</h3>
          <p style="font-size: 16px; color: #555;">
              Disposable vapes have seen a surge in popularity due to their convenience, affordability, and ease of use. However, this growth has also raised environmental concerns, as many of these products are single-use and not easily recyclable. Additionally, there are worries about the long-term health impacts of widespread disposable vape use, particularly among younger generations. The government has signaled that it may introduce a ban to address these issues and curb the rapid rise of disposable vape use in the UK.
          </p>
      </div>

      <div style="margin-top: 30px;">
          <h3 style="font-size: 24px; color: #1e88e5;">What This Means for Vapers</h3>
          <p style="font-size: 16px; color: #555;">
              If the ban goes into effect, it could lead to significant changes in the vaping market. Disposable vapes are currently a go-to option for many vapers because of their portability and ease of use. If these products are banned, users may need to transition to other alternatives, such as refillable vape kits. This could result in a shift in consumer behavior and create an opportunity for more sustainable, long-term vaping solutions to take center stage.
          </p>
      </div>

      <div style="margin-top: 30px;">
          <h3 style="font-size: 24px; color: #1e88e5;">The Regulatory Shift: What Could It Mean?</h3>
          <p style="font-size: 16px; color: #555;">
              While the potential ban is certainly a significant regulatory shift, it’s important to note that this could be part of a broader effort to improve the overall safety and sustainability of vaping products. Stricter regulations may lead to better-quality products, clearer labeling, and improved transparency within the industry. It could also help reduce the environmental impact caused by disposable vapes and foster greater awareness of responsible consumption.
          </p>
      </div>

      <div style="margin-top: 40px; text-align: center;">
          <h2 style="font-size: 26px; color: #1e88e5;">Looking Ahead</h2>
          <p style="font-size: 16px; color: #555; max-width: 800px; margin: 0 auto;">
              While the potential ban on disposable vapes might seem like the end of an era for some, it’s also an opportunity for the vaping industry to evolve and adapt. Consumers can expect to see more innovation and possibly more sustainable alternatives to disposable vapes. At the same time, a regulatory shift may improve consumer safety, making the vaping experience more reliable and responsible. Only time will tell where this shift will take us.
          </p>
      </div>

      <!-- Call to Action Section -->
      <div style="text-align: center; margin-top: 40px;">
          <a href="#" style="background-color: #1e88e5; color: white; text-decoration: none; padding: 12px 25px; font-size: 16px; border-radius: 5px; transition: background 0.3s;">
              Stay Informed About Vaping Regulations
          </a>
      </div>
  </section>
    `,
    image: blogBanUk,
    shortDescription:
      "The UK vaping community is buzzing about the potential ban on disposable vapes. Could this be the end of an era, or just another regulatory shift? Here's what you need to know.",
  },
  {
    title:
      "Understanding E-Liquid Ingredients: What’s Really Inside Your Vape Juice?",
    description: "",
    image: blogImg,
    shortDescription:
      "Learn about e-liquid ingredients like VG, PG, and flavors, their roles, safety tips, and what to check on labels.",
  },
];

function ViewAllBlogs(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <>
      <section
        className="gallery-area gallery-light black-area"
        style={{ marginTop: "30px" }}
      >
        <div className="container-lg">
          <div className="product__wrp pb-30 mb-25 bor-bottom d-flex flex-wrap align-items-center justify-content-xl-between justify-content-center">
            <div
              className="section-header d-flex align-items-center wow fadeInUp"
              data-wow-delay=".1s"
            >
              <span className="title-icon mr-10" />
              <h2>News and Blogs</h2>
            </div>
          </div>

          <div id="latest-item" className="tab-pane fade show active">
            <div className="row g-4">
              {blogArray?.map((item) => {
                return (
                  <div className="col-lg-3 mb-4">
                    <div
                      className="product__item bor"
                      onClick={() => {
                        dispatch(setBlog(item));
                        navigate(`/blog`);
                      }}
                    >
                      <a className="wishlist">
                        <i className="fa-regular fa-heart" />
                      </a>
                      <a className="product__image pt-20 d-block">
                        <img
                          className="font-image img-fluid"
                          src={item.image}
                          alt="image"
                          style={{ maxHeight: "300px", minHeight: "300px" }}
                        />
                        <img
                          className="back-image img-fluid"
                          src={item.image}
                          alt="image"
                          style={{ maxHeight: "300px", minHeight: "300px" }}
                        />
                      </a>
                      <div className="product__content">
                        <h5 className="mb-15">
                          <a className="primary-hover">{item.title}</a>
                        </h5>

                        <span
                          style={{ fontSize: "15px", fontWeight: "500" }}
                          className="ml-10"
                        >
                          {item.shortDescription}
                        </span>

                        {/* <span
                          style={{ fontSize: "15px", fontWeight: "500" }}
                          className="ml-10"
                        >
                          {item.description}
                        </span> */}
                      </div>
                      <a
                        className="product__cart d-block bor-top pointer"
                        onClick={() => {
                          dispatch(setBlog(item));
                          navigate(`/blog`);
                        }}
                      >
                        {/* <i className="fa-regular fa-cart-shopping primary-color me-1" /> */}
                        <span>Read More</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewAllBlogs;
