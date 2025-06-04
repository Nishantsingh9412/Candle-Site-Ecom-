import React from 'react';
// No import needed as we'll use Tailwind classes instead of Bootstrap Container

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="page-header">
            <div 
                className="header-image position-relative"
                style={{
                    backgroundImage: 'url(https://niana.co/cdn/shop/files/Blue_floral.jpg?v=1614300292)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '300px',
                    width: '100%',
                }}
            >
                {/* 
                <div className="overlay position-absolute w-100 h-100" 
                    style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        top: 0,
                        left: 0
                    }}>
                </div> 
                */}
                {/* <div className="container h-100 d-flex flex-column justify-content-center">
                    <div className="text-content position-relative text-white">
                        <h1 className="fw-bold">{title || 'Contact Us'}</h1>
                        {subtitle && <p className="lead">{subtitle}</p>}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default PageHeader;
