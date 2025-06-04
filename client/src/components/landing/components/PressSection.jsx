import React from 'react'

const PressSection = () => {
    return (
        <div className="py-12 px-4 bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">IN THE PRESS</h2>
                <p className="text-center mb-10">For press or media related inquiries, please write to info@example.com</p>
                
                {/* Press logos */}
                <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
                    <img src="/images/press/logo1.png" alt="Best Present Guide" className="h-10" />
                    <img src="/images/press/logo2.png" alt="Elle Decor" className="h-10" />
                    <img src="/images/press/logo3.png" alt="Grazia" className="h-10" />
                    <img src="/images/press/logo4.png" alt="Vogue" className="h-10" />
                    <img src="/images/press/logo5.png" alt="Verve" className="h-10" />
                    <img src="/images/press/logo6.png" alt="GQ" className="h-10" />
                </div>
                
                {/* Benefits section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="text-4xl mb-4">
                            <i className="fas fa-truck"></i> {/* You can use an icon library or SVG */}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">FREE SHIPPING</h3>
                        <p>Free shipping on all orders</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                        <div className="text-4xl mb-4">
                            <i className="fas fa-lock"></i> {/* You can use an icon library or SVG */}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">SECURE PAYMENT</h3>
                        <p>We value your trust</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                        <div className="text-4xl mb-4">
                            <i className="fas fa-comments"></i> {/* You can use an icon library or SVG */}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">24/7 SUPPORT</h3>
                        <p>We're here to help you</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PressSection
