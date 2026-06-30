import nodemailer from 'nodemailer';
import logger from '../utils/logger';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  private async getTransporter(): Promise<nodemailer.Transporter | null> {
    if (this.transporter) return this.transporter;

    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      try {
        await this.transporter.verify();
        logger.info('Email transporter verified successfully');
        return this.transporter;
      } catch (error) {
        logger.warn('Email transporter verification failed, using console fallback:', error);
        this.transporter = null;
      }
    }

    return null;
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const transporter = await this.getTransporter();

      if (transporter) {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || '"CyberGuardians Society" <noreply@cyberguardians.com>',
          to: options.to,
          subject: options.subject,
          html: options.html,
        });

        logger.info(`Email sent to ${options.to}: ${options.subject}`);
        return true;
      }

      logger.info(`[EMAIL FALLBACK] To: ${options.to}`);
      logger.info(`[EMAIL FALLBACK] Subject: ${options.subject}`);
      logger.info(`[EMAIL FALLBACK] Body: ${options.html.substring(0, 200)}...`);
      return true;
    } catch (error) {
      logger.error('Failed to send email:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
export default emailService;
