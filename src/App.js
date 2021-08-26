import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import {
  Button,
  CssBaseline,
  Divider,
  Link,
  Theme,
  ThemeProvider,
  Typography,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core';
import {
  ActionRequest,
  AudioActionResponse,
  ChatController,
  FileActionResponse,
  MuiChat,
} from 'chat-ui-react';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#007aff',
    },
  },
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    backgroundColor: 'gray',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxWidth: '640px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.background.default,
  },
  header: {
    padding: theme.spacing(1),
  },
  chat: {
    flex: '1 1 0%',
    minHeight: 0,
  },
}));

var formData;
var setFormData;
var notes;
var setNotes;
const initialFormState = { 
  id: '', 
  name: '' , 
  college: '', 
  image: '', 
  dzagaku: '',
  nanido: '',
  keisiki: '',
  good: '',
  manzokudo:'',
  kansou:'',
  }

async function createNote() {
  
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }
export function App(): React.ReactElement {

  
  [notes, setNotes] = useState([]);
  [formData, setFormData] = useState(initialFormState);

  const classes = useStyles();
  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: false,
    }),
  );
  

  React.useMemo(() => {
    echo(chatCtl);
  }, [chatCtl]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.container}>
          <Typography className={classes.header}>
            {'インターンシップ アンケート'}
            <Link href="https://github.com/twihike/chat-ui-react">
             
            </Link>{' '}
          
          <div className={classes.siginout}>
            <AmplifySignOut />
          </div>            
            
          </Typography>
          <Divider />
          <div className={classes.chat}>
            <MuiChat chatController={chatCtl} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

async function echo(chatCtl: ChatController): Promise<void> {

  await chatCtl.addMessage({
    type: 'text',
    content: `回答するアンケートを選択してください`,
    self: false,
    avatar: '-',
  });
  const anke = await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: '研修アンケート',
        text: '研修アンケート',
      },
      {
        value: 'アンケートA',
        text: 'アンケートA',
      },
      {
        value: 'アンケートB',
        text: 'アンケートB',
      },
    ],
  });
 await chatCtl.addMessage({
    type: 'text',
    content: `回答:${anke.value}`,
    self: false,
    avatar: '-',
  });

    if (anke.value == '研修アンケート'){



  await chatCtl.addMessage({
    type: 'text',
    content: `名前を入力してください`,
    self: false,
    avatar: '-',
  });
  const text = await chatCtl.setActionRequest({
    type: 'text',
    placeholder: '名前を入力してください',
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `回答:\n${text.value}`,
    self: false,
    avatar: '-',
  });

 await chatCtl.addMessage({
    type: 'text',
    content: `所属大学・選考を入力してください`,
    self: false,
    avatar: '-',
  });
  const text1 = await chatCtl.setActionRequest({
    type: 'text',
    placeholder: '所属大学・選考を入力してください',
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `回答:\n${text1.value}`,
    self: false,
    avatar: '-',
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `好きな物は何ですか？画像を登録して下さい`,
    self: false,
    avatar: '-',
  });
  
  const file = (await chatCtl.setActionRequest({
    type: 'file',
    accept: 'image/*',
    multiple: true,
  }));
  
  await chatCtl.addMessage({
    type: 'jsx',
    content: (
      <div>
        {file.files.map((f) => (
          <img
            key={file.files.indexOf(f)}
            src={window.URL.createObjectURL(f)}
            alt="File"
            style={{ width: '100%', height: 'auto' }}
          />
        ))}
      </div>
    ),
    self: false,
    avatar: '-',
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `座学の説明(石井さんの説明)は分かりやすかったですか？`,
    self: false,
    avatar: '-',
  });
  const sel = await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: '分かりやすかった',
        text: '分かりやすかった',
      },
      {
        value: '普通',
        text: '普通',
      },
      {
        value: 'もっと頑張れ',
        text: 'もっと頑張れ',
      },
    ],
  });
  
  
  await chatCtl.addMessage({
    type: 'text',
    content: `回答:${sel.value}`,
    self: false,
    avatar: '-',
  });

 await chatCtl.addMessage({
    type: 'text',
    content: `開発したアプリケーションの難易度はどうでしたか？`,
    self: false,
    avatar: '-',
  });
  const sel1 = await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: '難しかった',
        text: '難しかった',
      },
      {
        value: '普通',
        text: '普通',
      },
      {
        value: '簡単でした',
        text: '簡単でした',
      },
    ],
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `回答:${sel1.value}`,
    self: false,
    avatar: '-',
  });

 await chatCtl.addMessage({
    type: 'text',
    content: `希望するインターンの開催形式はどちらですか？`,
    self: false,
    avatar: '-',
  });
  const sel2 = await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: 'オンラインが良い',
        text: 'オンラインが良い',
      },
      {
        value: 'オフラインが良い',
        text: 'オフラインが良い',
      },
    ],
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `回答:${sel2.value}`,
    self: false,
    avatar: '-',
  });


  await chatCtl.addMessage({
    type: 'text',
    content: `全体を通して良かったと感じた内容を、当てはまるもの全て選択してください`,
    self: false,
    avatar: '-',
  });
  const mulSel = await chatCtl.setActionRequest({
    type: 'multi-select',
    options: [
      {
        value: '座学',
        text: '座学',
      },
      {
        value: '事例紹介',
        text: '事例紹介',
      },
      {
        value: 'アプリ開発',
        text: 'アプリ開発',
      },
      {
        value: '社員との懇談会',
        text: '社員との懇談会',
      },
    ],
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `回答:${mulSel.value}`,
    self: false,
    avatar: '-',
  });

 await chatCtl.addMessage({
    type: 'text',
    content: `全体を通しての満足度を教えてください`,
    self: false,
    avatar: '-',
  });
  const sel3 = await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: '満足',
        text: '満足',
      },
      {
        value: '普通',
        text: '普通',
      },
      {
        value: 'いまいち',
        text: 'いまいち',
      },
    ],
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `回答:${sel3.value}`,
    self: false,
    avatar: '-',
  });

 await chatCtl.addMessage({
    type: 'text',
    content: `全体を通しての感想を教えて下さい`,
    self: false,
    avatar: '-',
  });
  const text2 = await chatCtl.setActionRequest({
    type: 'text',
    placeholder: '全体を通しての感想を教えて下さい',
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `回答:${text2.value}`,
    self: false,
    avatar: '-',
  });

await chatCtl.addMessage({
    type: 'text',
    content: `アンケートは以上になります
  ご回答ありがとうございました`,
    self: false,
    avatar: '-',
  });
  
  setFormData({
  "name": text.value,
  "college": text1.value,
  "image": file.value,
  "dzagaku": sel.value,
  "nanido":  sel1.value,
  "keisiki": sel2.value,
  "good": mulSel.value,
  "manzokudo": sel3.value,
  "kansou": text2.value,
})
createNote();
  
  
  await chatCtl.addMessage({
    type: 'text',
    content: `氏名:${text.value}
所属大学・専攻:${text1.value}
座学の説明:${sel.value}
アプリケーション開発の難易度:${sel1.value}
希望るインターンの開催形式:${sel2.value}
全体を通して良かったと感じたもの:${mulSel.value}
全体を通しての満足度:${sel3.value}
全体を通しての感想:${text2.value}`,
    
    self: false,
    avatar: '-',
  });
}

else{
  await chatCtl.addMessage({
    type: 'text',
    content: `アンケートは以上になります
ご回答ありがとうございました`,
    self: false,
    avatar: '-',
  });

}




  echo(chatCtl);
}

function GoodInput({
  chatController,
  actionRequest,
}: {
  chatController: ChatController;
  actionRequest: ActionRequest;
}) {
  const chatCtl = chatController;

  const setResponse = React.useCallback((): void => {
    const res = { type: 'custom', value: 'Good!' };
    chatCtl.setActionResponse(actionRequest, res);
  }, [actionRequest, chatCtl]);

  return (
    <div>
      <Button
        type="button"
        onClick={setResponse}
        variant="contained"
        color="primary"
      >
        Good!
      </Button>
    </div>
  );
}

export default withAuthenticator(App);


