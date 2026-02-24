import { useState } from 'react';
import { Lock, Check, Loader, CreditCard, ShieldCheck } from 'lucide-react';
import { projectId, publicAnonKey } from './utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-14f75f49`;

export default function Checkout() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [productType, setProductType] = useState<'ebook' | 'bundle' | 'coaching'>('ebook');

  const products = {
    ebook: {
      name: "Stop Homework Battles - Complete Guide",
      price: 47,
      description: "63-page ebook + 3 bonus materials",
      includes: [
        "Complete 63-page ebook (PDF)",
        "Quick-Start Guide",
        "Teacher Email Scripts",
        "Homework Resistance Decoder",
        "Instant download",
        "30-day money-back guarantee",
      ],
    },
    bundle: {
      name: "Complete Bundle",
      price: 97,
      description: "Ebook + Templates + Advanced Strategies",
      includes: [
        "Everything in the ebook",
        "Advanced scaffolding templates",
        "Printable worksheets",
        "Behavior tracking sheets",
        "Teacher collaboration guide",
        "Priority email support",
      ],
      badge: "BEST VALUE",
    },
    coaching: {
      name: "1-on-1 Strategy Session",
      price: 297,
      description: "60-minute personalized consultation with Marianna",
      includes: [
        "Everything in the bundle",
        "60-minute strategy session",
        "Custom implementation plan",
        "Teacher communication script",
        "Follow-up email support",
        "Recording of session",
      ],
      badge: "PREMIUM",
    },
  };

  const handleCheckout = async () => {
    if (!email || !name) {
      alert('Please enter your name and email');
      return;
    }

    setLoading(true);

    try {
      // Create customer first
      const customerResponse = await fetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, name }),
      });

      const customerResult = await customerResponse.json();

      if (!customerResult.success) {
        throw new Error('Failed to create customer');
      }

      // Create Stripe checkout session
      const checkoutResponse = await fetch(`${API_BASE}/checkout/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          customerId: customerResult.customer.id,
          customerEmail: email,
          productType: productType,
          successUrl: `${window.location.origin}/ThankYou.tsx`,
          cancelUrl: `${window.location.origin}/Checkout.tsx`,
        }),
      });

      const checkoutResult = await checkoutResponse.json();

      if (checkoutResult.success && checkoutResult.url) {
        // Redirect to Stripe checkout
        window.location.href = checkoutResult.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error processing checkout. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = products[productType];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
            SECURE CHECKOUT
          </h1>
          <p className="text-[#333333] mt-1">Complete your order in seconds</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Selection & Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Options */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-black text-[#111111] mb-4">SELECT YOUR PACKAGE</h2>
              
              <div className="space-y-4">
                {Object.entries(products).map(([key, product]) => (
                  <button
                    key={key}
                    onClick={() => setProductType(key as any)}
                    className={`w-full text-left p-6 border-2 rounded-lg transition-all ${
                      productType === key
                        ? 'border-[#0d9488] bg-[#0d9488]/5'
                        : 'border-gray-200 hover:border-[#0d9488]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          productType === key
                            ? 'border-[#0d9488] bg-[#0d9488]'
                            : 'border-gray-300'
                        }`}>
                          {productType === key && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-black text-lg text-[#111111]">{product.name}</h3>
                          <p className="text-sm text-[#333333]">{product.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-[#0d9488]">${product.price}</div>
                        {product.badge && (
                          <div className="text-xs font-black text-white bg-[#0d9488] px-2 py-1 rounded mt-1">
                            {product.badge}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-black text-[#111111] mb-4">YOUR INFORMATION</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#111111] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0d9488] focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#111111] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0d9488] focus:outline-none"
                    placeholder="your@email.com"
                  />
                  <p className="text-sm text-[#333333] mt-2">
                    We'll send your download link to this email
                  </p>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <ShieldCheck className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#111111]">Secure Payment</p>
                  <p className="text-xs text-[#333333]">256-bit SSL encryption</p>
                </div>
                <div>
                  <Lock className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#111111]">Safe Checkout</p>
                  <p className="text-xs text-[#333333]">Powered by Stripe</p>
                </div>
                <div>
                  <Check className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#111111]">30-Day Guarantee</p>
                  <p className="text-xs text-[#333333]">Full refund if not satisfied</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-black text-[#111111] mb-4">ORDER SUMMARY</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-bold text-[#111111] mb-2">{selectedProduct.name}</h3>
                  <p className="text-sm text-[#333333] mb-4">{selectedProduct.description}</p>
                  
                  <div className="space-y-2">
                    {selectedProduct.includes.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0d9488] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#333333]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#333333]">Subtotal</span>
                  <span className="font-bold text-[#111111]">${selectedProduct.price}</span>
                </div>
                <div className="flex items-center justify-between text-2xl font-black">
                  <span className="text-[#111111]">Total</span>
                  <span className="text-[#0d9488]">${selectedProduct.price}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || !email || !name}
                className="w-full py-4 bg-[#0d9488] text-white font-black text-lg rounded-lg hover:bg-[#0891b2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mb-4"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Continue to Payment
                  </>
                )}
              </button>

              <p className="text-xs text-center text-[#333333]">
                You'll be redirected to our secure payment processor (Stripe) to complete your purchase
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-sm text-[#333333] mb-2">
            Questions? Email <a href="mailto:marianna@mzmarianna.com" className="text-[#0d9488] font-bold">marianna@mzmarianna.com</a>
          </p>
          <p className="text-xs text-[#333333]">
            © 2026 Mz. Marianna's Learning Kingdom. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
