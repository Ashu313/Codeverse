import React from "react";
 
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCheck } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";

 
const data = {
  Sheet1: [
    {
        "Topic:": "String",
        "Problem: ": "Reverse a String",
        "Done": "<->",
        "URL": "https://leetcode.com/problems/reverse-string/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Check whether a String is Palindrome or not",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/palindrome-string0817/1"
    },
    {
        "Topic:": "String",
        "Problem: ": "Find Duplicate characters in a string",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/print-all-the-duplicates-in-the-input-string/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Why strings are immutable in Java?",
        "Done": "<->",
        "URL": "<->"
    },
    {
        "Topic:": "String",
        "Problem: ": "Write a Code to check whether one string is a rotation of another",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/a-program-to-check-if-strings-are-rotations-of-each-other/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Write a Program to check whether a string is a valid shuffle of two strings or not",
        "Done": "<->",
        "URL": "https://www.programiz.com/java-programming/examples/check-valid-shuffle-of-strings"
    },
    {
        "Topic:": "String",
        "Problem: ": "Count and Say problem",
        "Done": "<->",
        "URL": "https://leetcode.com/problems/count-and-say/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Write a program to find the longest Palindrome in a string.[ Longest palindromic Substring]",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/longest-palindrome-in-a-string/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Find Longest Recurring Subsequence in String",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/longest-repeating-subsequence/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Print all Subsequences of a string.",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/print-subsequences-string/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Print all the permutations of the given string",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/permutations-of-a-given-string/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Split the Binary string into two substring with equal 0’s and 1’s",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/split-the-binary-string-into-substrings-with-equal-number-of-0s-and-1s/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Word Wrap Problem [VERY IMP].",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/word-wrap/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "EDIT Distance [Very Imp]",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/edit-distance3702/1"
    },
    {
        "Topic:": "String",
        "Problem: ": "Find next greater number with same set of digits. [Very Very IMP]",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/next-permutation/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Balanced Parenthesis problem.[Imp]",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/parenthesis-checker/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Word break Problem[ Very Imp]",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/word-break/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Rabin Karp Algo",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/"
    },
    {
        "Topic:": "String",
        "Problem: ": "KMP Algo",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/longest-prefix-suffix2527/1"
    },
    {
        "Topic:": "String",
        "Problem: ": "Convert a Sentence into its equivalent mobile numeric keypad sequence.",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/convert-a-sentence-into-its-equivalent-mobile-numeric-keypad-sequence0547/1"
    },
    {
        "Topic:": "String",
        "Problem: ": "Minimum number of bracket reversals needed to make an expression balanced.",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/count-the-reversals/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Count All Palindromic Subsequence in a given String.",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/count-palindromic-subsequences/1"
    },
    {
        "Topic:": "String",
        "Problem: ": "Count of number of given string in 2D character array",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/count-occurences-of-a-given-word-in-a-2-d-array/1"
    },
    {
        "Topic:": "String",
        "Problem: ": "Search a Word in a 2D Grid of characters.",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/find-the-string-in-grid/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Boyer Moore Algorithm for Pattern Searching.",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Converting Roman Numerals to Decimal",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/roman-number-to-integer/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Longest Common Prefix",
        "Done": "<->",
        "URL": "https://leetcode.com/problems/longest-common-prefix/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Number of flips to make binary string alternate",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/min-number-of-flips/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Find the first repeated word in string.",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/second-most-repeated-string-in-a-sequence/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Minimum number of swaps for bracket balancing.",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/minimum-swaps-for-bracket-balancing/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Find the longest common subsequence between two strings.",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/longest-common-subsequence/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Program to generate all possible valid IP addresses from given  string.",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/generate-ip-addresses/1"
    },
    {
        "Topic:": "String",
        "Problem: ": "Write a program to find the smallest window that contains all characters of string itself.",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/smallest-distant-window/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Rearrange characters in a string such that no two adjacent are same",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/rearrange-characters/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Minimum characters to be added at front to make string palindrome",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/minimum-characters-added-front-make-string-palindrome/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Given a sequence of words, print all anagrams together",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/k-anagrams-1/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Find the smallest window in a string containing all characters of another string",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Recursively remove all adjacent duplicates",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/consecutive-elements/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "String matching where one string contains wildcard characters",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/wildcard-string-matching/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Function to find Number of customers who could not get a computer",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/function-to-find-number-of-customers-who-could-not-get-a-computer/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Transform One String to Another using Minimum Number of Given Operation",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/transform-one-string-to-another-using-minimum-number-of-given-operation/"
    },
    {
        "Topic:": "String",
        "Problem: ": "Check if two given strings are isomorphic to each other",
        "Done": "<->",
        "URL": "https://practice.geeksforgeeks.org/problems/isomorphic-strings/0"
    },
    {
        "Topic:": "String",
        "Problem: ": "Recursively print all sentences that can be formed from list of word lists",
        "Done": "<->",
        "URL": "https://www.geeksforgeeks.org/recursively-print-all-sentences-that-can-be-formed-from-list-of-word-lists/"
    },
  ],
};

export const String = () => {
  useEffect(() => {
    const active = window.localStorage.getItem("color-key");
    console.log("color-key");
    setActive(JSON.parse(active));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key", JSON.stringify(active));
  });

  useEffect(() => {
    const active1 = window.localStorage.getItem("color-key1");
    console.log("color-key1");
    setActive1(JSON.parse(active1));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key1", JSON.stringify(active1));
  });

  useEffect(() => {
    const active2 = window.localStorage.getItem("color-key2");
    console.log("color-key2");
    setActive2(JSON.parse(active2));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key2", JSON.stringify(active2));
  });

  useEffect(() => {
    const active3 = window.localStorage.getItem("color-key3");
    console.log("color-key3");
    setActive3(JSON.parse(active3));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key3", JSON.stringify(active3));
  });

  useEffect(() => {
    const active4 = window.localStorage.getItem("color-key4");
    console.log("color-key4");
    setActive4(JSON.parse(active4));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key4", JSON.stringify(active4));
  });

  useEffect(() => {
    const active5 = window.localStorage.getItem("color-key5");
    console.log("color-key5");
    setActive5(JSON.parse(active5));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key5", JSON.stringify(active5));
  });

  useEffect(() => {
    const active6 = window.localStorage.getItem("color-key6");
    console.log("color-key6");
    setActive6(JSON.parse(active6));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key6", JSON.stringify(active6));
  });

  useEffect(() => {
    const active7 = window.localStorage.getItem("color-key7");
    console.log("color-key7");
    setActive7(JSON.parse(active7));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key7", JSON.stringify(active7));
  });

  useEffect(() => {
    const active8 = window.localStorage.getItem("color-key8");
    console.log("color-key8");
    setActive8(JSON.parse(active8));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key8", JSON.stringify(active8));
  });

  useEffect(() => {
    const active9 = window.localStorage.getItem("color-key9");
    console.log("color-key9");
    setActive9(JSON.parse(active9));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key9", JSON.stringify(active9));
  });

  useEffect(() => {
    const active10 = window.localStorage.getItem("color-key10");
    console.log("color-key10");
    setActive10(JSON.parse(active10));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key10", JSON.stringify(active10));
  });

  useEffect(() => {
    const active11 = window.localStorage.getItem("color-key11");
    console.log("color-key11");
    setActive11(JSON.parse(active11));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key11", JSON.stringify(active11));
  });

  useEffect(() => {
    const active12 = window.localStorage.getItem("color-key12");
    console.log("color-key12");
    setActive12(JSON.parse(active12));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key12", JSON.stringify(active12));
  });

  useEffect(() => {
    const active13 = window.localStorage.getItem("color-key13");
    console.log("color-key13");
    setActive13(JSON.parse(active13));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key13", JSON.stringify(active13));
  });

  useEffect(() => {
    const active14 = window.localStorage.getItem("color-key14");
    console.log("color-key14");
    setActive14(JSON.parse(active14));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key14", JSON.stringify(active14));
  });

  useEffect(() => {
    const active15 = window.localStorage.getItem("color-key15");
    console.log("color-key15");
    setActive15(JSON.parse(active15));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key15", JSON.stringify(active15));
  });

  useEffect(() => {
    const active16 = window.localStorage.getItem("color-key16");
    console.log("color-key16");
    setActive16(JSON.parse(active16));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key16", JSON.stringify(active16));
  });

  useEffect(() => {
    const active17 = window.localStorage.getItem("color-key17");
    console.log("color-key17");
    setActive17(JSON.parse(active17));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key17", JSON.stringify(active17));
  });

  useEffect(() => {
    const active18 = window.localStorage.getItem("color-key18");
    console.log("color-key18");
    setActive18(JSON.parse(active18));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key18", JSON.stringify(active18));
  });

  useEffect(() => {
    const active19 = window.localStorage.getItem("color-key19");
    console.log("color-key19");
    setActive19(JSON.parse(active19));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key19", JSON.stringify(active19));
  });

  useEffect(() => {
    const active20 = window.localStorage.getItem("color-key20");
    console.log("color-key20");
    setActive20(JSON.parse(active20));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key20", JSON.stringify(active20));
  });

  useEffect(() => {
    const active21 = window.localStorage.getItem("color-key21");
    console.log("color-key21");
    setActive21(JSON.parse(active21));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key21", JSON.stringify(active21));
  });

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
    alert("Question has been marked as done");
  };

  const [active1, setActive1] = useState(false);
  const handleClick1 = () => {
    setActive1(!active1);
    alert("Question has been marked as done");
  };

  const [active2, setActive2] = useState(false);
  const handleClick2 = () => {
    setActive2(!active2);
    alert("Question has been marked as done");
  };

  const [active3, setActive3] = useState(false);
  const handleClick3 = () => {
    setActive3(!active3);
    alert("Question has been marked as done");
  };

  const [active4, setActive4] = useState(false);
  const handleClick4 = () => {
    setActive4(!active4);
    alert("Question has been marked as done");
  };

  const [active5, setActive5] = useState(false);
  const handleClick5 = () => {
    setActive5(!active5);
    alert("Question has been marked as done");
  };

  const [active6, setActive6] = useState(false);
  const handleClick6 = () => {
    setActive6(!active6);
    alert("Question has been marked as done");
  };

  const [active7, setActive7] = useState(false);
  const handleClick7 = () => {
    setActive7(!active7);
    alert("Question has been marked as done");
  };

  const [active8, setActive8] = useState(false);
  const handleClick8 = () => {
    setActive8(!active8);
    alert("Question has been marked as done");
  };

  const [active9, setActive9] = useState(false);
  const handleClick9 = () => {
    setActive9(!active9);
    alert("Question has been marked as done");
  };

  const [active10, setActive10] = useState(false);
  const handleClick10 = () => {
    setActive10(!active10);
    alert("Question has been marked as done");
  };

  const [active11, setActive11] = useState(false);
  const handleClick11 = () => {
    setActive11(!active11);
    alert("Question has been marked as done");
  };

  const [active12, setActive12] = useState(false);
  const handleClick12 = () => {
    setActive12(!active12);
    alert("Question has been marked as done");
  };

  const [active13, setActive13] = useState(false);
  const handleClick13 = () => {
    setActive13(!active13);
    alert("Question has been marked as done");
  };

  const [active14, setActive14] = useState(false);
  const handleClick14 = () => {
    setActive14(!active14);
    alert("Question has been marked as done");
  };

  const [active15, setActive15] = useState(false);
  const handleClick15 = () => {
    setActive15(!active15);
    alert("Question has been marked as done");
  };

  const [active16, setActive16] = useState(false);
  const handleClick16 = () => {
    setActive16(!active16);
    alert("Question has been marked as done");
  };

  const [active17, setActive17] = useState(false);
  const handleClick17 = () => {
    setActive17(!active17);
    alert("Question has been marked as done");
  };

  const [active18, setActive18] = useState(false);
  const handleClick18 = () => {
    setActive18(!active18);
    alert("Question has been marked as done");
  };

  const [active19, setActive19] = useState(false);
  const handleClick19 = () => {
    setActive19(!active19);
    alert("Question has been marked as done");
  };

  const [active20, setActive20] = useState(false);
  const handleClick20 = () => {
    setActive20(!active20);
    alert("Question has been marked as done");
  };

  const [active21, setActive21] = useState(false);
  const handleClick21 = () => {
    setActive21(!active21);
    alert("Question has been marked as done");
  };

  // useEffect(() => {
  //     window.localStorage.setItem('save', JSON.stringify(isActive));
  // });

  // useEffect(() => {
  //     const savedData = window.localStorage.getItem("save");
  //     console.log(savedData);
  //     setIsActive(JSON.parse(savedData))

  // }, []);
 
    const [completed, setCompleted] = useState([]);
  
    const handleMarkComplete = (index) => {
      const newCompleted = [...completed];
      newCompleted[index] = !completed[index];
      setCompleted(newCompleted);
  
      // Show toast notification
      toast.success(`Question ${index + 1} has been marked as completed!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
  
    return (
      <div className="array-page bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="table-container p-6 bg-white rounded-lg shadow-lg">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Status</th>
                <th className="px-4 py-2 border border-gray-300 w-1/12">ID</th>
                <th className="px-4 py-2 border border-gray-300">Questions</th>
                <th className="px-4 py-2 border border-gray-300">Links</th>
              </tr>
            </thead>
            <tbody>
              {data.Sheet1.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    completed[index] ? "bg-green-100" : "bg-white"
                  } border-b border-gray-300 hover:bg-gray-100`}
                >
                  <td
                    className="px-4 py-2 border border-gray-300 text-center cursor-pointer"
                    onClick={() => handleMarkComplete(index)}
                  >
                    {completed[index] ? (
                      <AiOutlineCheck className="text-green-500 text-2xl" />
                    ) : (
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item["Problem: "]}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <a href={item.URL} target="_blank" rel="noreferrer">
                      <BsBoxArrowUpRight className="text-blue-500 text-xl" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    );
  };
  
  export default String;
  