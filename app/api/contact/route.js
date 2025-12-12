import nodemailer from "nodemailer";

export async function POST(req) {
  const { firstname, lastname, email, phone, service, message } =
    await req.json();

  // Relaxed validation: only require firstname (used as Name), message, and contact info
  if (!firstname || !message || (!email && !phone)) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  // Check if GMAIL_APP_PASSWORD is configured
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.warn(
      "GMAIL_APP_PASSWORD is not defined. Simulating email send.\n",
      "To: abhinavyadav8+port@gmail.com\n",
      "From:", firstname, email, "\n",
      "Message:", message
    );
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "abhinavyadav8+port@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD, // App password, not Gmail main password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <abhinavyadav8+port@gmail.com>`,
      replyTo: email || undefined,
      to: "abhinavyadav8+port@gmail.com",
      subject: `New Contact Form${service ? `: ${service}` : ""}`,
      html: `
    <p>Name: ${firstname} ${lastname || ""}</p>
    <p>Email: ${email}</p>
    ${phone ? `<p>Phone: ${phone}</p>` : ""}
    ${service ? `<p>Service: ${service}</p>` : ""}
    <p>Message: ${message}</p>
  `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
