import mailer from '../config/mailer';

class MailService {
  async sendResetPasswordMail(to: string, link: string) {
    await mailer.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Password change request confirmation',
      html: `
              <div>
                <h5>Dear Customer!</h5>
                <p>
                  We have received your request to change your password for your account.
                </p>
                <p>
                  Your account security is our top priority, and we are happy to assist you in updating your login credentials.
                </p>
                <p>
                  To proceed with the password change, please click on the following <a href="${link}">link</a> 
                  to access the password reset page.
                </p>
              </div>
            `
    });
  }
}

export const mailService = new MailService();
