import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-stone-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Shipping Policy</h1>
      <section className="mb-8">
        <p>
          At Scented Gleams, we are committed to delivering your orders quickly
          and safely. Our shipping policy is designed to provide you with a
          seamless experience from the moment you place your order to the moment
          it arrives at your doorstep.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Shipping Methods</h2>
        <h3 className="font-semibold mt-4 mb-1">Domestic Shipping</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>We offer free shipping throughout India.</li>
          <li>Orders are processed within 1-2 business days.</li>
          <li>
            Standard delivery typically takes 5-7 business days, depending on
            your location and chosen shipping method.
          </li>
          <li>
            Express shipping is available for select locations, with dispatch
            within 24 hours and delivery in 2-3 working days.
          </li>
          <li>
            Tracking information will be provided via email or SMS once your
            order is shipped.
          </li>
        </ul>
        <h3 className="font-semibold mt-4 mb-1">International Shipping</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            We ship internationally to many countries. Shipping costs are
            calculated at checkout based on the weight of your order and
            destination.
          </li>
          <li>Orders are processed within 1-3 business days.</li>
          <li>
            International delivery usually takes 7-10 business days, but may
            vary due to customs or other factors.
          </li>
          <li>
            Recipients are responsible for any customs duties or taxes.
          </li>
          <li>
            Tracking information will be provided once your order is shipped.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Tracking</h2>
        <p>
          You will receive a unique tracking link or number via email or SMS
          after your order has been processed and shipped. Use this to monitor
          your package and stay updated on its estimated delivery date.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Changes</h2>
        <p>
          If you need to make changes to your order (such as updating your
          shipping address), please contact our customer support team as soon as
          possible. We will do our best to accommodate your request, but changes
          may not be possible once the order has shipped.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Issues</h2>
        <p>
          If you experience any issues with your order, such as delays or damage
          during shipping, please reach out to our customer support team. We are
          here to assist you and resolve any problems to ensure your
          satisfaction.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          For any questions or concerns about our shipping policy, please
          contact us at{" "}
          <a
            href="mailto:info@scentedgleams.com"
            className="text-blue-600 underline"
          >
            info@scentedgleams.com
          </a>
          .
        </p>
      </section>
      <div className="text-sm text-stone-500 text-right">
        Last updated: June 23, 2025
      </div>
    </div>
  );
};

export default ShippingPolicy;
