import nodemailer from "nodemailer";

export async function POST(req) {
  const { firstname, lastname, email, phone, service, message, to } =
    await req.json();

  if (!firstname || !lastname || !message || (!email && !phone)) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
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
      subject: `New Contact Form: ${service}`,
      html: `
    <p>Name: ${firstname} ${lastname}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>Service: ${service}</p>
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
