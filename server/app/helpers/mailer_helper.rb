module MailerHelper
  def self.send_mail_with_file(email, subject, body, file)
    Pony.mail(
      to: email,
      subject: subject,
      body: body,
      via: :smtp,
      attachments: { File.basename(file) => File.read(file) }
    )
  end

  def self.send_mail(email, subject, body)
    Pony.mail(to: email, subject: subject, body: body, via: :smtp)
  end
end
