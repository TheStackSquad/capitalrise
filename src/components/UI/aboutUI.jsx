// src/components/UI/aboutUI.jsx
'use client';

import React, { useState } from 'react';
import { developers } from '@/components/data/authorData';

const AboutUI = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="p-6 bg-[var(--card)] rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold font-robotoSlab mb-6 text-[var(--text)]">About the Developers</h2>
            {developers.map((dev, index) => (
                <div key={index} className="mb-4 border-b border-[var(--border)]">
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center p-4 bg-[var(--card)] hover:bg-[var(--accent)] transition-colors duration-200"
                    >
                        <span className="text-lg font-semibold font-jetbrains text-[var(--text)]">{dev.name}</span>
                        <span className="text-[var(--text)]">{openIndex === index ? '−' : '+'}</span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                    >
                        <div className="p-4 font-jetbrians bg-[var(--card)]">
                            <p className="text-[var(--text)]"><strong>City:</strong> {dev.city}</p>
                            <p className="text-[var(--text)]"><strong>Phone:</strong> {dev.phone}</p>
                            <p className="text-[var(--text)]"><strong>Email:</strong> {dev.email}</p>
                            <p className="text-[var(--text)]"><strong>Tech Stack:</strong> {dev.techStack.join(', ')}</p>
                            <p className="text-[var(--text)]"><strong>Hobbies:</strong> {dev.hobbies.join(', ')}</p>
                            <p className="text-[var(--text)]"><strong>Interests:</strong> {dev.interests.join(', ')}</p>
                            <div className="flex gap-4 mt-4">
                                <a href={dev.socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--primary)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                    </svg>
                                </a>
                                <a href={dev.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--primary)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect x="2" y="9" width="4" height="12" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                                <a href={dev.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--primary)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                    </svg>
                                </a>
                                <a href={dev.socialMedia.gmail} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--primary)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AboutUI;