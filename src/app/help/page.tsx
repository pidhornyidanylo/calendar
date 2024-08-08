import React from "react";
import styles from "./Help.module.css";

const faqs = [
  {
    question: "How do I add an event to the calendar?",
    answer:
      "To add an event, simply click on the date you wish to add the event to and fill in the details in the pop-up form. Once completed, click 'Save' to add the event to your calendar.",
  },
  {
    question: "Can I sync the calendar with other devices?",
    answer:
      "Yes, you can sync the calendar with other devices by signing in with the same account on those devices. Our app supports synchronization across multiple platforms.",
  },
  {
    question: "How do I set up reminders for my events?",
    answer:
      "When creating or editing an event, you can set up reminders by selecting the reminder option and choosing the time you want to be reminded. You can set multiple reminders for each event.",
  },
  {
    question: "Can I share my calendar with others?",
    answer:
      "Yes, you can share your calendar with others by clicking the 'Share' button and entering the email address of the person you want to share it with. They will receive an invitation to view your calendar.",
  },
  {
    question: "How do I customize the appearance of the calendar?",
    answer:
      "You can customize the appearance of the calendar by going to the settings menu and selecting 'Appearance'. From there, you can choose different themes, colors, and layouts.",
  },
  {
    question: "What should I do if I encounter a bug?",
    answer:
      "If you encounter a bug, please report it through our support page or contact our customer service team. Provide as much detail as possible to help us resolve the issue quickly.",
  },
  {
    question: "How do I delete an event?",
    answer:
      "To delete an event, click on the event and then select the 'Delete' option. Confirm the deletion to remove the event from your calendar.",
  },
  {
    question: "Is there a way to recover deleted events?",
    answer:
      "Yes, you can recover deleted events from the 'Trash' section in the app. Deleted events are stored there for 30 days before being permanently removed.",
  },
  {
    question: "How do I export my calendar?",
    answer:
      "To export your calendar, go to the settings menu and select 'Export'. You can choose to export your calendar in various formats such as .ics or .csv.",
  },
  {
    question: "Can I set recurring events?",
    answer:
      "Yes, you can set recurring events by selecting the 'Recurring' option when creating or editing an event. You can specify the frequency and duration of the recurrence.",
  },
  {
    question: "How do I change my account settings?",
    answer:
      "To change your account settings, click on your profile picture in the top right corner and select 'Settings'. From there, you can update your personal information, change your password, and manage other account settings.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "To contact customer support, click on the 'Support' link in the app's footer or go to our support page. You can submit a support ticket or use the live chat feature to get assistance.",
  },
  {
    question: "Can I import events from another calendar?",
    answer:
      "Yes, you can import events from another calendar by going to the settings menu and selecting 'Import'. Follow the instructions to upload a compatible file or connect your existing calendar account.",
  },
  {
    question: "How do I adjust the timezone settings?",
    answer:
      "To adjust the timezone settings, go to the settings menu and select 'Timezone'. From there, you can choose your preferred timezone for displaying events.",
  },
  {
    question: "How do I enable dark mode?",
    answer:
      "To enable dark mode, go to the settings menu and select 'Appearance'. You can toggle the dark mode option to switch between light and dark themes.",
  },
];

const Help: React.FC = () => {
  return (
    <>
      <h2 className={styles.helpTitle}>Frequently Asked Questions</h2>
      <p className={styles.helpParagraph}>
        Welcome to the FAQ page for our Calendar App. Below you will find
        answers to some of the most common questions users have about our
        application. If you have any further queries, feel free to contact our
        support team.
      </p>

      <ul className={styles.helpList}>
        {faqs.map((faq) => (
          <li key={faq.question} className={styles.helpListItem}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Help;
