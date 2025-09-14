import SEO from '../components/SEO';
import { useState } from 'react';
import Footer from '../components/Footer';
import styles from './contact.module.css';

export default function Contact() {
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [values, setValues] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setValues({ ...values, [id]: value });
        setErrors({ ...errors, [id]: '' }); // clear tooltip while typing
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const newErrors = {};
        let firstInvalidField = null;

        // Loop through inputs and textareas
        Array.from(form.elements).forEach((el) => {
            if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && !firstInvalidField) {
                if (!el.checkValidity()) {
                    newErrors[el.id] = el.validationMessage; // show browser message
                    firstInvalidField = el; // mark first invalid field
                }
            }
        });

        setErrors(newErrors);

        if (firstInvalidField) {
            firstInvalidField.focus(); // scroll & open keyboard on mobile
        } else {
            console.log('Form submitted:', values);
            setValues({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
        }
    };

    return (
        <div className="page-container">
            <SEO
                title="Contact - Sesame Blog"
                description="Get in touch with Sesame Blog for inquiries or questions on administrative law, immigration, and human rights."
            />

            <main className={styles['contact-container']}>
                <h1>Get in touch</h1>

                <form
                    className={styles['contact-form']}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {['name', 'email', 'message'].map((field) => (
                        <div key={field} className={styles['form-group']}>
                            {field !== 'message' ? (
                                <input
                                    type={field === 'email' ? 'email' : 'text'}
                                    id={field}
                                    placeholder=" "
                                    maxLength={field === 'name' || field === 'email' ? 100 : 500}
                                    value={values[field]}
                                    onChange={handleChange}
                                    required
                                />
                            ) : (
                                <textarea
                                    id="message"
                                    placeholder=" "
                                    rows="6"
                                    maxLength="500"
                                    value={values.message}
                                    onChange={handleChange}
                                    required
                                />
                            )}

                            <label htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>

                            {/* Tooltip using browser default text */}
                            {errors[field] && (
                                <div className={styles['error-tooltip']}>{errors[field]}</div>
                            )}
                        </div>
                    ))}

                    <button type="submit" className={styles['submit-button']}>
                        Send
                    </button>
                </form>
            </main>

            <Footer />
        </div>
    );
}
