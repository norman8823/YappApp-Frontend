import React from "react";
import "../styles/FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-container">
      <header className="faq-header">
        <h1>Welcome to YappApp</h1>
        <p>Here’s how to get the most out of your experience!</p>
      </header>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h3>What is YappApp?</h3>
          <p>
            YappApp is a unique social platform where you can log in once a day
            to respond to a single prompt shared with everyone. After
            responding, you can view how others answered the same prompt and
            interact with their responses. It’s all about engaging with fresh
            ideas and perspectives daily!
          </p>
        </div>

        <div className="faq-item">
          <h3>How does it work?</h3>
          <p>
            Each day, there’s a new prompt. Log in, and if you respond to the
            prompt, you’ll be able to see everyone else’s posts for that day. If
            you skip the day, you won’t have access to that day’s prompt or
            posts. However, you can still explore and interact with previous
            days' topics.
          </p>
        </div>

        <div className="faq-item">
          <h3>What happens if I don’t respond to the prompt?</h3>
          <p>
            No worries! You don’t have to respond daily. But keep in mind, if
            you don’t post a response, you won’t be able to see that day’s
            prompt or others' responses. You can still browse past topics and
            even comment on or like previous responses.
          </p>
        </div>

        <div className="faq-item">
          <h3>Can I interact with others' posts?</h3>
          <p>
            Absolutely! Once you’ve posted your response for the day, you can
            view and engage with other users' posts. You can also like or
            dislike posts, and leave comments on posts from previous days.
          </p>
        </div>

        <div className="faq-item">
          <h3>How do I see previous topics?</h3>
          <p>
            Navigate to the past topics section. You’ll be able to explore older
            prompts and engage with responses through comments or likes, even if
            you missed posting on that specific day.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
