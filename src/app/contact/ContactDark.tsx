"use client";

import styles from "./contactDark.module.css";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export function ContactDark() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedPlan, setSelectedPlan] = useState<string>("Freelance Work");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName.trim() || !email.trim() || !message.trim()) {
            setStatus("error");
            setStatusMessage("Please fill in your name, email, and message.");
            return;
        }

        setStatus("loading");
        setStatusMessage("");

        try {
            const response = await fetch("https://formsubmit.co/ajax/awaisarain953@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    Name: fullName,
                    Email: email,
                    "Inquiry Type": selectedPlan,
                    Message: message,
                    _subject: `New Portfolio Inquiry from ${fullName} (${selectedPlan})`,
                    _template: "table"
                })
            });

            if (response.ok) {
                setStatus("success");
                setStatusMessage("Thank you! Your inquiry has been sent to Awais.");
                setFullName("");
                setEmail("");
                setMessage("");
                setSelectedPlan("Freelance Work");
                setTimeout(() => {
                    setStatus("idle");
                    setStatusMessage("");
                }, 6000);
            } else {
                setStatus("error");
                setStatusMessage("Could not send message. Please email directly at awaisarain953@gmail.com.");
            }
        } catch {
            setStatus("error");
            setStatusMessage("Network error. Please email directly at awaisarain953@gmail.com.");
        }
    };

    return (
        <section className={styles.contactSection}>
            {/* Header Info */}
            <div className={styles.headerInfo}>
                <div className={styles.headerCol}>
                    <span>© CONTACT 連絡先</span>
                </div>
                <div className={styles.headerCol} style={{ textAlign: "center" }}>
                    <span>(WDX® — 07)</span>
                </div>
                <div className={styles.headerCol} style={{ textAlign: "right" }}>
                    <span>LET'S TALK</span>
                </div>
            </div>

            <div className={styles.contentWrapper}>
                {/* Left Column */}
                <div className={styles.leftColumn}>
                    <div className={styles.pill}>
                        <div className={styles.pillDot} />
                        CONTACT & SUPPORT
                    </div>

                    <h2 className={styles.title}>
                        I’d Love to Hear <span className={styles.titleLight}>From You.</span>
                    </h2>

                    <p className={styles.description}>
                        Have questions or need support? I'm always here to help you every step of the way.
                    </p>

                </div>

                {/* Right Column - Form */}
                <form className={styles.rightColumn} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>FULL NAME</label>
                        <input
                            type="text"
                            className={styles.inputField}
                            placeholder="Jane Smith"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <div className={styles.line}>
                            <div className={styles.lineFiller} />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>YOUR EMAIL</label>
                        <input
                            type="email"
                            className={styles.inputField}
                            placeholder="jane@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className={styles.line}>
                            <div className={styles.lineFiller} />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>INQUIRY TYPE</label>
                        <div className={styles.planSelection}>
                            {["Freelance Work", "Full-time Job", "Just saying Hi"].map((plan) => (
                                <button
                                    key={plan}
                                    type="button"
                                    className={`${styles.planButton} ${selectedPlan === plan ? styles.planActive : ""}`}
                                    onClick={() => setSelectedPlan(plan)}
                                >
                                    {plan}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>MESSAGE</label>
                        <textarea
                            className={styles.textareaField}
                            rows={3}
                            placeholder="Type Your Message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <div className={styles.line}>
                            <div className={styles.lineFiller} />
                        </div>
                    </div>

                    {/* Global style primary-btn aligned right */}
                    <div className={styles.submitWrapper}>
                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={status === "loading"}
                            style={{ opacity: status === "loading" ? 0.8 : 1, cursor: status === "loading" ? "not-allowed" : "pointer" }}
                        >
                            <span className="btnText">
                                {status === "loading"
                                    ? "SENDING..."
                                    : status === "success"
                                    ? "MESSAGE SENT ✓"
                                    : "GET IN TOUCH"}
                            </span>
                            <div className="btnIconCircle">
                                <div className="arrowTrack">
                                    {status === "loading" ? (
                                        <Loader2 size={16} className={styles.spinIcon} />
                                    ) : status === "success" ? (
                                        <Check size={16} strokeWidth={2.5} className={styles.checkIcon} />
                                    ) : (
                                        <>
                                            <div className="arrowIconPrimary">
                                                <ArrowRight size={16} strokeWidth={2.2} />
                                            </div>
                                            <div className="arrowIconSecondary">
                                                <ArrowRight size={16} strokeWidth={2.2} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </button>

                        {statusMessage && (
                            <p
                                className={`${styles.statusFeedback} ${
                                    status === "success" ? styles.statusSuccess : styles.statusError
                                }`}
                            >
                                {statusMessage}
                            </p>
                        )}
                    </div>

                </form>

            </div>
        </section>
    );
}
