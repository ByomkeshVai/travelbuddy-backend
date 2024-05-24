import nodemailer from 'nodemailer';

const transporterOption = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'lyric.breitenberg47@ethereal.email',
    pass: '3JN8j6SUE114MpugsT',
  },
});

export const sendMail = (email: string, subject: string, body: any) => {
  try {
    const mailOption = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      html: body,
    };

    transporterOption.sendMail(mailOption, (error) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
