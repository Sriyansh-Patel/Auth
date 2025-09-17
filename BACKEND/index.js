import express from 'express';
import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

let defaultClient = brevo.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

let apiInstance = new brevo.TransactionalEmailsApi();

app.get("/", (req, res) => {
    res.send("Hello World fdadsd");
});

app.post("/send-email", async (req, res) => {
    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = req.body.subject || "Default Subject";
    sendSmtpEmail.htmlContent = req.body.htmlContent || "<html><body><h1>Default Content: This is a transactional email</h1></body></html>";
    sendSmtpEmail.sender = { "name": req.body.senderName || "Your App", "email": req.body.senderEmail || "example@example.com" };
    sendSmtpEmail.to = req.body.to || [{ "email": "recipient@example.com", "name": "Recipient Name" }];
    sendSmtpEmail.replyTo = { "email": req.body.replyToEmail || "sriyanshmgr@gmail.com", "name": req.body.replyToName || "Your App Reply" };
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "My param value", "subject": sendSmtpEmail.subject };

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        res.status(200).json({ message: "Email sent successfully!", data: data });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: "Failed to send email", error: error.response ? error.response.text : error.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // sriyanshmgr
    console.log("MongoDB Connection String (for reference): mongodb+srv://sriyanshmgr:vjp0q33mZ8qi0NuA@cluster0.i3onf5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Username (for reference): sriyanshmgr");
    console.log("MongoDB Password (for reference): vjp0q33mZ8qi0NuA");
});
