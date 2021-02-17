from django.core.management.base import BaseCommand
from django.conf import settings
from telegram import Bot
from telegram import Update
from telegram.ext import CallbackContext, MessageHandler, Filters
from telegram.ext import Updater
from telegram.utils.request import Request

from accounts.models import UserCabinet


def log_errors(f):
    def inner(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            error_message = f'Произошла ошибка: {e}'
            print(error_message)
            raise e

    return inner


@log_errors
def do_echo(update: Update, context: CallbackContext):
    tg_user = update.message.from_user
    user = UserCabinet.objects.filter(tg_name=tg_user.username)
    if user:
        context.bot.send_message(chat_id=update.effective_chat.id, text="Йо :3")
        user.update(tg_id=update.effective_chat.id)
    else:
        context.bot.send_message(chat_id=update.effective_chat.id, text="Додайте себе в кабінеті!")


class Command(BaseCommand):
    help = 'Телеграм-бот'

    def handle(self, *args, **options):
        request = Request(
            connect_timeout=0.5,
            read_timeout=1.0,
        )
        bot = Bot(
            request=request,
            token=settings.TOKEN,
            base_url=getattr(settings, 'PROXY_URL', None),
        )
        print(bot.get_me())

        # 2 -- обработчики
        updater = Updater(
            bot=bot,
            use_context=True,
        )


        message_handler = MessageHandler(Filters.text, do_echo)
        updater.dispatcher.add_handler(message_handler)


        # 3 -- запустить бесконечную обработку входящих сообщений
        updater.start_polling()
        updater.idle()
