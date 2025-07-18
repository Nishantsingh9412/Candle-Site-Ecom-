import React from "react";

const ReturnAndRefund = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-stone-800">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Return &amp; Refund Policy
      </h1>
      <section className="mb-8">
        <p>
          At Scented Gleams, your satisfaction is our priority. Please review our
          return and refund policy before making a purchase. By shopping with us,
          you agree to the following terms.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Exchanges</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            If you receive a product that is damaged, the wrong size, or not what
            you ordered, you may request an exchange.
          </li>
          <li>
            To start the exchange process, email us at {" "}
            <a
              // href="mailto:info@scentedgleams.com"
              href="mailto:scentedgleam@gmail.com"
              className="text-blue-600 underline"
            >
              scentedgleam@gmail.com
            </a>
             {" "} for instructions and the return address.
          </li>
          <li>Exchanges are only accepted within 10 days of delivery.</li>
          <li>
            The returned item must be in its original condition: undamaged,
            unused, unworn, unwashed, with all labels and tags attached, and in
            its original packaging.
          </li>
          <li>Include the original receipt or invoice with your return.</li>
          <li>
            We do not offer reverse pickup services. You are responsible for
            shipping the item back to us and for any return shipping costs.
          </li>
          <li>
            Exchanges are only for a different size of the same item. We do not
            accept exchanges for different designs or products.
          </li>
          <li>We do not accept exchanges for accessories or earrings.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Refunds</h2>
        <p>
          We do not accept returns or issue refunds. Please review all product
          details and photos before placing your order.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Exceptions</h2>
        <p>
          If we are unable to provide your purchased item in the required size
          or cannot fulfill your order due to other issues, we will issue store
          credit. This credit is valid for 1 month and must be used within that
          time for a new purchase.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Issues</h2>
        <p>
          If you experience any issues with your order, such as delays or damage
          during shipping, please contact our customer support team. We are here
          to assist you and resolve any problems to ensure your satisfaction.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          For any questions or concerns about our return and refund policy,
          please contact us at{" "}
          <a
            href="mailto:scentedgleam@gmail.com"
            className="text-blue-600 underline"
          >
            scentedgleam@gmail.com
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

export default ReturnAndRefund;
