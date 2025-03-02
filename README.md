# Healthcare Collaboration Dashboard

This project is a comprehensive healthcare collaboration platform designed for both doctors and patients. It includes multiple dashboards with real-time features, analytics, and an integrated chat component that supports both human-to-human and AI-assisted communication.

## Table of Contents
- [Features](#features)
- [Components](#components)
  - [Doctor Dashboard](#doctor-dashboard)
  - [Patient Dashboard](#patient-dashboard)
  - [Chat Component](#chat-component)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

## Features

- **Responsive Dashboard UI:**  
  - Dark theme with blue accents to provide a modern, professional look.
  - Full-page gradient backgrounds and minimized white space for a denser layout.
  
- **Doctor Dashboard:**
  - **Opportunities Tab:**  
    View a list of posted healthcare opportunities with details like title, description, pay scale, location, and gender requirement.
  - **Add Opportunity Tab:**  
    Allows doctors to submit new opportunities with input fields for title, description, age range, gender, location, and compensation.
  - **Analytics Tab:**  
    Displays multiple charts (Bar, Pie, Line, Doughnut, Radar) to provide visual insights on various metrics such as:
    - Monthly opportunities posted.
    - Patient gender distribution.
    - Weekly patient consultations.
    - Consultation types.
    - Doctor skill proficiency.
  
- **Patient Dashboard:**  
  (Included in the overall project)  
  - Displays next doctor visit details, assigned medications, and daily feedback options.
  - Integrated chat popup for emergency assistance.

- **Chat Component:**
  - Supports real-time messaging using Socket.IO.
  - Integrates AI responses via OpenAI’s GPT-4 for AI-assisted guidance.
  - Toggle between chatting with a doctor or an AI assistant.
  - Consistent dark/blue color scheme across all components.
  - Additional features include:
    - Chat mode switching.
    - Displaying message sender and content.
    - Typing indicator for AI response simulation.

## Components

### Doctor Dashboard
- **Opportunities Tab:**  
  Lists current healthcare opportunities with details.
- **Add Opportunity Tab:**  
  Form to add new opportunities. On successful submission, the new opportunity is appended to the list.
- **Analytics Tab:**  
  Utilizes `react-chartjs-2` and `chart.js` to display five different charts:
  - **Bar Chart:** Monthly opportunities posted.
  - **Pie Chart:** Patient gender distribution.
  - **Line Chart:** Weekly patient consultations.
  - **Doughnut Chart:** Consultation types.
  - **Radar Chart:** Doctor skill proficiency.

### Patient Dashboard
- Displays personalized information such as:
  - Upcoming doctor visits.
  - Assigned medications with schedule.
  - Daily feedback submission.
- Integrated emergency assistance chat button.

### Chat Component
- **Real-time Messaging:**  
  Uses Socket.IO for real-time chat between users.
- **AI Chat Integration:**  
  Uses OpenAI’s API (GPT-4) to provide automated responses when chatting with AI.
- **UI Features:**  
  - Toggle between "Talk to Doctor" and "Talk to AI".
  - Styled message bubbles with sender identification.
  - Dark-themed input fields and buttons.

## Usage

### Doctor and Patient Dashboards
- Access the dashboards via their respective routes. 
- Each dashboard contains dedicated tabs for various functionalities (viewing opportunities, adding opportunities, analytics, etc.).

### Chat Functionality
- Click on the chat button in the bottom right corner of any dashboard to open the chat window.
- Toggle between chatting with a doctor or an AI assistant as needed.

## Future Enhancements

### Message Timestamps & Read Receipts
- Add timestamps and indicators to show when messages are read or delivered.

### File & Image Attachments
- Enable support for sending images or documents in the chat.

### Emoji & GIF Support
- Integrate an emoji picker to enhance messaging expressiveness.

### User Presence Indicators
- Display online status or typing indicators for chat participants.

### Theme Toggle
- Allow users to switch between dark and light themes.

### Group Chat & Chat History Search
- Enhance chat functionality with support for group conversations and searching past messages.
