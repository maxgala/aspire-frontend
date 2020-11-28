import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Button } from "@material-ui/core";

function FAQPopup({ openFaq, handleFaqClose }) {
  return (
    <Dialog
      open={openFaq}
      onClose={handleFaqClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
      maxWidth={"md"}
      PaperProps={{
        style: { borderRadius: 12 },
      }}
    >
      <DialogTitle id="scroll-dialog-title">
        <div>
          <h2 style={{ margin: "0px", marginTop: "10px", color: "#B5A165" }}>
            FAQ
          </h2>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
          component={"span"}
        >
          <h3 style={{ color: "#B5A165" }}>Professional Career:</h3>
          <p>
            <b>What kind of jobs are posted on MAX Aspire?</b>
          </p>
          <p>
            Employers are eager to hire talented individuals from the MAX
            Network. Jobs are posted from different kind of employers in many
            sectors and industries. Apply to job opportunities posted directly
            from a MAX Aspire member.
          </p>
          <p>
            <b>How do I access the application portal?</b>
          </p>
          <p>
            After you create an account, you can start accessing the application
            portal by signing in and navigating through roles.
          </p>
          <p>
            <b>What makes applying for jobs on MAX portal different?</b>
          </p>
          <p>
            Jobs on the platform are posted directly from a MAX Aspire member,
            giving you the ability to directly reach out to job posters and
            increasing your chances of landing the job.
          </p>
          <p>
            <b>Who posts the roles for the MAX Aspire platform?</b>
          </p>
          <p>
            All jobs are posted by MAX Aspire members that include HR
            professionals, and our carefully selected Senior executives.
          </p>
          <p>
            <b>Is there a limit on how many jobs I can post on the platform?</b>
          </p>
          <p>There is no limit to how many jobs you can post.</p>
          <p>
            <b>Can I apply to multiple roles with the same employer?</b>
          </p>
          <p>Yes, you can apply to multiple roles with the same employer.</p>
          <p>
            <b>How many credits does it take to apply for roles?</b>
          </p>
          <p>
            Applying for roles for premium members requires no credit. However
            to directly contact the job poster requires 5 credits.
          </p>
          <br />
          <h3 style={{ color: "#B5A165" }}>Mock Interview:</h3>
          <p>
            <b>What is a Mock Interview?</b>
          </p>
          <p>
            A mock interview is a practice interview that aims to simulate as
            closely as possible that actual interview environment with the goal
            of preparing you and giving you the best chances to land your dream
            job.
          </p>
          <p>
            <b>What are the advantages of a Mock Interview?</b>
          </p>
          <ul>
            <li>
              Reduce all the stress and anxiety by being prepared and ready
            </li>
            <li>
              Provide you with the opportunity for feedback in a low-stress
              environment
            </li>
            <li>Increase your confidence</li>
            <li>
              Learn from the tough questions and walk in your interview prepared
              for all kinds of questions
            </li>
          </ul>
          <p>
            <b>How long should I prepare for a Mock interview?</b>
          </p>
          <ul>
            <li>
              Try your best to simulate the interview environment as much as you
              can
            </li>
            <li>Dress for success</li>
            <li>Bring your up to date resume</li>
            <li>Research the company you are applying for</li>
          </ul>
          <p>
            <b>Who will be conducting my Mock Interview?</b>
          </p>
          <p>
            A member from the carefully selected Senior executives will be
            conducting your mock interview.
          </p>
          <p>
            <b>Where can I sign up for a Mock Interview?</b>
          </p>
          <p>
            Once you create a premium account and sign in you will have access
            to get started for Mock interviews through the Coffee Chats
            dashboard. Alternatively, you can create a Free membership then you
            can get started through pay per use service.
          </p>
          <p>
            <b>Can I sign up for multiple Mock Interviews?</b>
          </p>
          <p>Yes, as long as you have enough credits.</p>
          <p>
            <b>What are some of the tips for a successful Mock Interview?</b>
          </p>
          <p>
            Practice practice practice! Try to simulate the interview setting
            and treat the interview like the actual interview by doing all the
            preparation work and research before you start.
          </p>
          <p>
            <b>How many credits does it take to book a Mock Interview?</b>
          </p>
          <p>5 credits are required.</p>
          <br />
          <h3 style={{ color: "#B5A165" }}>1 on 1:</h3>
          <p>
            <b>Who are the Senior Executives?</b>
          </p>
          <p>
            Our Senior Executives are high performing, accomplished Senior
            Executive in their respective fields with 15+ years of experience to
            help guide, mentor, and assist in shaping your career.
          </p>
          <p>
            <b>What are the advantages of a 1 on 1 session?</b>
          </p>
          <ul>
            <li>
              Connect and network with some of the highest achieving Senior
              executives and get mentored by them
            </li>
            <li>Improve your communication and personal skills</li>
            <li>Know the skills needed to land your dream job</li>
          </ul>
          <p>
            <b>How should I prepare for a 1 on 1 session?</b>
          </p>
          <p>
            Be prepared by doing research on the Senior executives in your
            session and preparing a list of questions or set of Goals you are
            looking to achieve from the session.
          </p>
          <p>
            <b>How many credits does it take to book a 1 on 1?</b>
          </p>
          <p>5 credits are required.</p>
          <p>
            <b>What is the process for scheduling a 1 on 1?</b>
          </p>
          <p>
            Once you create a premium account and sign in, you will have access
            to get started with 1 on 1 chats. Alternatively, you can create a
            Free account and then use the pay per use model to book coffee
            chats.
          </p>
          <br />
          <h3 style={{ color: "#B5A165" }}>4 on 1:</h3>
          <p>
            <b>How should I prepare for a 4 on 1 session?</b>
          </p>
          <p>
            Set clear goals of what you are looking to achieve in this session.
          </p>
          <p>
            <b>How many credits does it take to book a 4 on 1?</b>
          </p>
          <p>3 credits are required.</p>
          <p>
            <b>What is the process for scheduling a 4 on 1?</b>
          </p>
          <p>
            Once you create a premium account and sign in, you will have access
            to get started with 4 on 1 chats. Alternatively, you can create a
            Free account and then use the pay per use model to book coffee
            chats.
          </p>
          <br />
          <h3 style={{ color: "#B5A165" }}>Board of Directors:</h3>
          <p>
            <b>Who can apply for a board role?</b>
          </p>
          <p>
            Please refer to the job postings. if you meet all the requirements
            and eligibility criteria then click on the “Apply Now” tab and
            follow the steps.
          </p>
          <p>
            <b>
              I submitted my application online but I did not receive a
              confirmation email.
            </b>
          </p>
          <p>
            Please allow between 24-48hrs before reaching out to the support
            team. Confirmation email is automatically generated. Check your spam
            folder before reaching out to the support team.
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleFaqClose}
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "auto", backgroundColor: "#B5A165" }}
        >
          <b>Close</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FAQPopup;
