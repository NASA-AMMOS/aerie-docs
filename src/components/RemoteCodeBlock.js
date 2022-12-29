import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';

export default function RemoteCodeBlock(props) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const response = await fetch(props.url);
      const text = await response.text();
      setCode(text);
    } catch (e) {
      setCode('');
    }
    setLoading(false);
  });

  if (loading) {
    return <CodeBlock {...props}>Loading...</CodeBlock>;
  } else {
    return <CodeBlock {...props}>{code}</CodeBlock>;
  }
}
