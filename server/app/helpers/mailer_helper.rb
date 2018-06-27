module MailerHelper
  def self.send_mail(email, subject, body)
    Pony.mail(to: email, subject: subject, body: body, via: :smtp)
  end
end
