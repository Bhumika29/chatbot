

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.alicebot.ab.Bot;
import org.alicebot.ab.Chat;
import org.alicebot.ab.History;
import org.alicebot.ab.MagicBooleans;
import org.alicebot.ab.MagicStrings;
import org.alicebot.ab.utils.IOUtils;



/**
 * Servlet implementation class ChatbotRun
 */
@WebServlet("/ChatbotRun")
public class ChatbotRun extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChatbotRun() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter out=response.getWriter();
		out.write("<p>Hello</p>");
	//	out.write("<input type='text' name='url'/>");
		response.getWriter().append("Served at: ").append(request.getContextPath());
		processRequest(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	protected void processRequest (HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

	//	final boolean TRACE_MODE = false;
	 //   String botName = "super";
	 
	   
	        try {
	 
	            String resourcesPath = getResourcesPath();
	            System.out.println(resourcesPath);
	         //   MagicBooleans.trace_mode = TRACE_MODE;
	            Bot bot = new Bot("super", resourcesPath);
	            Chat chatSession = new Chat(bot);
	            bot.brain.nodeStats();
	            String textLine = "";
	 
	            while(true) {
	           //     System.out.print("Human : ");
	            	textLine=request.getParameter("url");
	            //	textLine = IOUtils.readInputTextLine();
	                if ((textLine == null) || (textLine.length() < 1))
	                    textLine = MagicStrings.null_input;
	                if (textLine.equals("q")) {
	                    System.exit(0);
	                } else if (textLine.equals("wq")) {
	                    bot.writeQuit();
	                    System.exit(0);
	                } else {
	                    String req = textLine;
	             /*       if (MagicBooleans.trace_mode)
	                        System.out.println("STATE=" + req + ":THAT=" + ((History) chatSession.thatHistory.get(0)).get(0) + ":TOPIC=" + chatSession.predicates.get("topic"));
	               */
	                    String resp = chatSession.multisentenceRespond(req);
	                    while (resp.contains("&lt;"))
	                        resp = resp.replace("&lt;", "<");
	                    while (resp.contains("&gt;"))
	                        resp = resp.replace("&gt;", ">");
	                    System.out.println("Robot : " + resp);
	                }
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    
	 
	}
        public String getResourcesPath() {
            File currDir = new File(".");
            String path = currDir.getAbsolutePath();
            path = path.substring(0, path.length() - 2);
            System.out.println(path);
            String resourcesPath = path + File.separator + "WebContent" + File.separator + "WEB-INF";
            return resourcesPath;
        }
    


}